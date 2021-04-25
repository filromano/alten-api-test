const express = require('express');
const app = express();
const routes = require('./api/routes');

require('./config/db');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth-token");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
 });

 app.use('/api', routes);

const port = 8081;
 
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});