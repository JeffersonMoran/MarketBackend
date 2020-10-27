'use strict';

const express = require('express');
const consign = require("consign");
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require("cors");
const helmet = require('helmet')
const mongoose = require('mongoose');

require('dotenv').config();

// Constants
const PORT = process.env.PORT || 3000;

const HOST = 'localhost';

// App
let app = express();

mongoose.connect('mongodb://localhost/MARKET', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.db = db

app.use(helmet());
app.use(logger('dev'));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(' API CALL ' + `Time: ${Date.now()}`)
  console.log(' ' + req.method + ' ', req.url);
  console.log(' HEADERS: ', req.headers.authorization);
  console.log(' BODY: ', req.body);
  next();
})

consign()
  .then("./models")
  .then("./utils")
  .then("./services")
  .then("./controllers")
  .then("./middlewares")
  .then("./routes")
  .into(app);

app.listen(PORT, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
  //app.utils.dbPopulate.generateData();
});