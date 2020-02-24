'use strict';

const express = require('express');
const bodyParser = require('body-parser');

// Constants
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// App
let app = express();
require('./db')(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(' API CALL ' + `Time: ${Date.now()}`)
  console.log(' ' + req.method + ' ', req.url);
  console.log(' HEADERS: ', req.headers.authorization);
  console.log(' BODY: ', req.body);
  next();
})

app.use('/user', require('./src/routes/user'))
app.use('/market', require('./src/routes/market'))
app.use('/product', require('./src/routes/product'))

app.get('/', (req, res) => {
  res.send('Hello World aaa');
});

app.get('/test', (req, res) => {
  console.log('teesaaste');
  res.send('Hello Worssldss');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);