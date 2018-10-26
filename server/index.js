var express = require('express');
var path = require('path');
var db = require('../database/index.js');
var bodyParser = require('bodyParser');

var app = express();

app.use(express.static(path.join(__dirname, '../public')));

// other routes
app.get('/menus/:restaurantName', (request, response) => {
  // invoke database method and send back results as correct data form
})

app.listen(2000, () => {
  console.log('listening on port 2000');
})