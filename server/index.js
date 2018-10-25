var express = require('express');
var app = express();
var path = require('path');
var db = require('../databse/index.js');

app.use(express.static(path.join(__dirname, '../public')));

// other routes

app.listen(2000, () => {
  console.log('listening on port 2000');
})