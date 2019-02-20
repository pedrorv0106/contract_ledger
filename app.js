const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const engine = require('ejs-mate');
const app = express();


// view engine setup
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));

const api = require('./controllers/Api');
api.initializeApp(app);

module.exports = app;
