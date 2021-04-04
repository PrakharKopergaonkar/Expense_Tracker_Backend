const db = require("../models");
const User = db.users;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");



exports.signup = async (req, res) => {
  const body = req.body;
 
   
   const user = User({
    name: body.NAME,
    email: body.EMAIL,
    password: bcrypt.hashSync(body.PASSWORD, 10)
   })
    
   user.save()
    .then((result) => {
      return res.status(200).json({
        status: true,
        message: `User registered successfully`
      })
    })
    .catch((error) => {
      console.log(error)
      return res.status(500).json({
        status: false,
        error: error.message
      })
    })
   
};

exports.signin = (req, res) => {
  User.findOne({
    "email": req.body.EMAIL
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.PASSWORD,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const jsontoken = jwt.sign({
        result: user.email
       }, "expressTrackerToken", {
        expiresIn: "24h"
       });

       return res.status(200).json({
        status: true,
        message: "Logged in successfully",
        token: jsontoken,
        email: req.body.EMAIL,
        user_id:user.user_id,
       });
    })
    .catch(err => {
      return res.status(500).json({
        status: false,
        message: err.message
       });
     
    });
};