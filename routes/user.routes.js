const controller = require("../controller/user.controller");
const {
  validationResult,
  body
 } = require('express-validator');

 const validate = validations => {
  return async (req, res, next) => {
   await Promise.all(validations.map(validation => validation.run(req)));
 
   const errors = validationResult(req);
   if (errors.isEmpty()) {
    return next();
   }
 
   res.status(422).json({
    errors: errors.array()
   });
  };
 };

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/users/getAllUsers", 
    controller.getAllUsers
  )

  app.delete("/api/users/deleteAllUsers",
    controller.deleteAllUsers
  )
};