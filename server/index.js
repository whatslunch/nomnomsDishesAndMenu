var express = require('express');
var path = require('path');
var db = require('../database/index.js');

var app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.get('/menus/:restaurantName', (request, response) => {
  // invoke database method and sends back results
  // express & .send already stringifies it, so you don't have to

  console.log('should be the restaurantname in the URL>>>>', request.params.restaurantName);
  var restaurantName = request.params.restaurantName;

  db.getDishes(restaurantName, (error, results) => {
    if (error) {
      response.status(500).send(error.message);
    } else {
      response.status(200).send(results);
    }
  });

});

// the length of results we get back tells us how many different photos there are for the given dish at the given restaurant
app.get('/menus/:restaurantName/dishes/:dishId/photos', (request, response) => {

  var restaurantName = request.params.restaurantName;
  var dishId = request.params.dishId;

  db.getPhotosForDish(restaurantName, dishId, (error, results) => {
    if (error) {
      response.status(500).send(error.message);
    } else {
      response.status(200).send(results);
    }
  });

});

// use the id of the first record returned from photos, to search for its url
app.get('/photos/:photoid', (request, response) => {

  var photoId = request.params.photoid;

  db.getPhotoData(photoId, (error, results) => {
    if (error) {
      response.status(500).send(error.message);
    } else {
      response.status(200).send(results);
    }
  });

});

app.listen(2000, () => {
  console.log('listening on port 2000');
});