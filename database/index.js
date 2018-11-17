var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  database: 'yumpSF',
  user: 'root'
});

var addRestaurant = function (name, callback) {
  connection.query('INSERT INTO restaurants (name) VALUES (?)', [name], callback);
};

var updateRestaurant = (name, id, cb) => {
  var queryStr = 'update restaurants SET name=? WHERE id=?';
  connection.query(queryStr, [name ,id], cb);
};

var deleteRestaurant = (id, cb) => {
  var queryStr = 'DELETE FROM restaurants WHERE id=?';
  connection.query(queryStr, [id], cb);
};

var getDishes = function (restaurantName, callback) {
  var queryStr = 'SELECT * from dishes WHERE restaurant_id IN (SELECT id from restaurants where name = ?)';
  connection.query(queryStr, [restaurantName], callback);
};

var getPhotosForDish = function (restaurantName, dishId, callback) {
  var queryStr = 'SELECT * from dishes_photos WHERE dishes_id = ?';
  connection.query(queryStr, [dishId], callback);
};

var getPhotoData = function (photoId, callback) {
  var queryStr = 'SELECT * FROM photos WHERE id = ?';
  connection.query(queryStr, [photoId], callback);
};

const getRestaurantName = function (restaurantId, callback) {
  let queryStr = 'SELECT name FROM restaurants WHERE id = ?';
  connection.query(queryStr, [restaurantId], callback);
};

module.exports = { addRestaurant, getDishes, getPhotosForDish, getPhotoData, getRestaurantName, connection, updateRestaurant, deleteRestaurant };