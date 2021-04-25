const express = require('express');
const app = express();
const { checkAvailability } = require('./controllers/availableDays');
const { bookRoom } = require('./controllers/bookRoom');
require('./config/db');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth-token");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
 });

 app.get('/api/checkAvailability', async (req, res) => {
    const availableDays = await checkAvailability();
    res.json(availableDays);
 });

 app.post('/api/bookRoom', async (req, res) => {
    const { message, status, args } = await bookRoom(req.body);
    res.status(status).json({message, args})
 })

const port = 8081;
 
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});