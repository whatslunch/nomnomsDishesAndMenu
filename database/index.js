var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  database: 'yumpSF'
});

var addRestaurant = function (name, callback) {
  connection.query('INSERT INTO restaurants (name) VALUES (?)', [name], (error, results, fields) => {
    if (error) {
      callback(error);
    } else {
      callback(null, results);
    }
  });
}

module.exports = { addRestaurant }