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

var getDishes = function (restaurantName, callback) {
  var queryStr = 'SELECT restaurants.name, dishes.name, dishes.price, dishes.description, dishes.reviews, photos.url, photos.caption FROM restaurants INNER JOIN dishes ON dishes.restaurant_id = restaurants.id INNER JOIN dishes_photos ON dishes_photos.dishes_id = dishes.id INNER JOIN photos ON photos.id = dishes_photos.photos_id WHERE restaurants.name = ?';
  connection.query(queryStr, [restaurantName], (error, results, fields) => {
    if (error) {
      callback(error);
    } else {
      callback(null, results);
    }
  });
}

module.exports = { addRestaurant, getDishes }