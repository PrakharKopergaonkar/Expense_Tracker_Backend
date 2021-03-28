const controller = require("../controller/auth.controller");
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

  app.post(
    "/api/auth/signup",
    validate([
      body('NAME').not().isEmpty().withMessage('Please Enter the Name.'),
      body('EMAIL').not().isEmpty().isEmail().withMessage('Please Enter the valid Email Address.'),
      body('PASSWORD').not().isEmpty().isLength({
       min: 5
      }).withMessage('Password must be at least 5 character long'),
      
     ]),
    controller.signup
  );

  

  app.post("/api/auth/signin",
  validate([
    body('EMAIL').not().isEmpty().withMessage('Please Enter the valid Email Address.'),
    body('PASSWORD').not().isEmpty().withMessage('Please Enter Password')
   ]), controller.signin);

};