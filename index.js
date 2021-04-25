const express = require('express');
const app = express();
const { checkAvailability } = require('./controllers/availableDays');
const { bookRoom } = require('./controllers/bookRoom');
const { cancelRoom } = require('./controllers/cancelRoom');

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
 });

 app.delete('/api/cancelBook/:id', async (req, res) => {
    const { status, message } = await cancelRoom(req.params.id)
    res.status(status).send(message)
 })

const port = 8081;
 
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});