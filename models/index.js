const db = {}


//configure your models here
db.users = require("./user.model");
db.expense = require("./expense.model");

module.exports = db;