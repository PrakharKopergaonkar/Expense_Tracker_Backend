const express = require('express')
const app = express()
 


app.get('/', function (req, res) {
  res.send('API Running')
})
 
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
})