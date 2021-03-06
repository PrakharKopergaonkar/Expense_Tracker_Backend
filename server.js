const express = require("express");
const mongoose =  require('mongoose');
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require('./config/config');
const autoincrement = require("mongoose-auto-increment");

const expenseRoutes = require('./routes/expense.routes');

// Connection URL
mongoose.Promise = global.Promise
console.log(config.mongoUri)
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`)
})



autoincrement.initialize(mongoose.connection);
module.exports = autoincrement





const app = express();


// parse requests of content-type - application/json
app.use(bodyParser.json());


app.use(cors())

app.get("/", (req, res) => res.send("API Running"));


//Define Routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require("./routes/expense.routes")(app);

const PORT = process.env.PORT || 5000;




var server =app.listen(PORT, () => {
	console.log(`Server started on ${PORT}`);
});

server.timeout = 5000;

