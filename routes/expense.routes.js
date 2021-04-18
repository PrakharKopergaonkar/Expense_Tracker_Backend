const controller = require("../controller/expense.controller");

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
    error: errors.array()
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

  // app.post(
  //   "/api/auth/signup",
  //   validate([
  //     body('NAME').not().isEmpty().withMessage('Please Enter the Name.'),
  //     body('EMAIL').not().isEmpty().isEmail().withMessage('Please Enter the valid Email Address.'),
  //     body('PASSWORD').not().isEmpty().isLength({
  //      min: 5
  //     }).withMessage('Password must be at least 5 character long'),
      
  //    ]),
  //   controller.signup
  // );

  

  // app.post("/api/auth/signin",
  // validate([
  //   body('EMAIL').not().isEmpty().withMessage('Please Enter the valid Email Address.'),
  //   body('PASSWORD').not().isEmpty().withMessage('Please Enter Password')
  //  ]), controller.signin);

  app.get(
    '/api/expenses/current/preview',
    controller.currentMonthPreview
  )

  
app.get('/api/expenses',
  controller.listByUser
)

app.post("/api/expenses",
  controller.create
)

// router.route('/api/expenses/:expenseId')
//   // .get(authCtrl.requireSignin, expenseCtrl.read)
//   .put(authCtrl.requireSignin, expenseCtrl.hasAuthorization, expenseCtrl.update)
//   .delete(authCtrl.requireSignin, expenseCtrl.hasAuthorization, expenseCtrl.remove)
app.put("/api/expenses/:expenseId",
  controller.update
)

app.delete("/api/expenses/:expenseId",
    controller.remove
)

};


// const router = express.Router()

// router.route('/api/expenses/current/preview')
  

// router.route('/api/expenses/by/category')
//   .get(authCtrl.requireSignin, expenseCtrl.expenseByCategory)

// router.route('/api/expenses/plot')
//   .get(authCtrl.requireSignin, expenseCtrl.plotExpenses)

// router.route('/api/expenses/category/averages')
//   .get(authCtrl.requireSignin, expenseCtrl.averageCategories)

// router.route('/api/expenses/yearly')
//   .get(authCtrl.requireSignin, expenseCtrl.yearlyExpenses)

// router.route('/api/expenses')
//   .post(authCtrl.requireSignin, expenseCtrl.create)
//   .get(authCtrl.requireSignin, expenseCtrl.listByUser)

// router.route('/api/expenses/:expenseId')
//   // .get(authCtrl.requireSignin, expenseCtrl.read)
//   .put(authCtrl.requireSignin, expenseCtrl.hasAuthorization, expenseCtrl.update)
//   .delete(authCtrl.requireSignin, expenseCtrl.hasAuthorization, expenseCtrl.remove)

// router.param('expenseId', expenseCtrl.expenseByID)

// module.exports = router

