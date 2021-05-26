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


app.put("/api/expenses/:expenseId",
  controller.update
)

app.delete("/api/expenses/:expenseId",
    controller.remove
)
 app.get('/api/expenses/:expenseId',
  controller.read
 )

 app.get('/api/expense/getExpenseReport')
  .get(controller.getExpenseReport)






};



