const db = require("../models");
const User = db.users;


exports.getAllUsers = async (req, res) => {
   
    User.find({})
        .then((data) => {
            return res.status(200).json({
                status: true,
                data: data
            })
        })
        .catch((error) => {
            return res.status(500).json({
                status: false,
                error: error.message
            })
        })
};


exports.deleteAllUsers = (req, res) => {
    User.deleteMany({})
        .then((num) => {
                return res.status(200).json({
                    status: true,
                    message: "All Users has been deleted"
                })
            })
        .catch(error => {
            return res.status(500).json({
                status: false,
                error: error.message
            })
        })
} 

