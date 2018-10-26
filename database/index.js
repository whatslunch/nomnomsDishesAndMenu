var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  database: 'yumpSF',
  user: 'root'
});

var addRestaurant = function (name, callback) {
  connection.query('INSERT INTO restaurants (name) VALUES (?)', [name], callback);
}

var getDishes = function (restaurantName, callback) {
  var queryStr = 'SELECT dishes.id, dishes.name, dishes.price, dishes.description, dishes.reviews, photos.url, photos.caption FROM restaurants INNER JOIN dishes ON dishes.restaurant_id = restaurants.id INNER JOIN dishes_photos ON dishes_photos.dishes_id = dishes.id INNER JOIN photos ON photos.id = dishes_photos.photos_id WHERE restaurants.name = ? LIMIT 25';
  connection.query(queryStr, [restaurantName], callback);
}

var getPhotosForDish = function (restaurantName, dishId, callback) {
  // define the query with the given inputs!!!
  // PICK UP HERE
  var queryStr = 'SELECT * from dishes_photos INNER JOIN dishes ON dishes_photos.dishes_id = dishes.id INNER JOIN restaurants ON restaurants.id = dishes.restaurant_id WHERE restaurants.name = ? AND dishes.id = ?';
  connection.query(queryStr, [restaurantName, dishId], callback);
}

module.exports = { addRestaurant, getDishes, getPhotosForDish }