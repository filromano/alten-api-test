const express = require('express');
const app = express();
const { checkAvailability } = require('./controllers/availableDays');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth-token");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
 });

 app.get('/api/checkAvailability', (req, res) => {
    const availableDays = checkAvailability();
    res.json(availableDays);
 });
 
const port = 8081;
 
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});