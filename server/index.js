require('newrelic');
const express = require('express');
const path = require('path');
const db = require('../database/index.js');
const NonReldb = require('./../nonRelationalDB/index.js');

var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


app.use(express.static(path.join(__dirname, '../public')));

app.get('/:restaurant_id', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/restaurants/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id;
  // console.log('restaurantID form server>>', id);

  NonReldb.getRestaurantName(id, (error, results) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      // console.log('results from database>>>', results);
      res.status(200).send(results);
    }
  });
});

app.get('/menus/:restaurantName', (request, response) => {
  // invoke database method and sends back results
  // express & .send already stringifies it, so you don't have to

  // console.log('should be the restaurantname in the URL>>>>', request.params.restaurantName);
  const restaurantName = request.params.restaurantName;

  NonReldb.getDishes(restaurantName, (error, results) => {
    if (error) {
      response.status(500).send(error.message);
    } else {
      response.status(200).send(results);
    }
  });
});

// the length of results we get back tells us how many different photos there are for the given dish at the given restaurant
app.get('/menus/:restaurantName/dishes/:dishId/photos', (request, response) => {
  const restaurantName = request.params.restaurantName;
  const dishId = request.params.dishId;
  // console.log('dishID being passed in with ajax request>>>', dishId);

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
  const photoId = request.params.photoid;

  db.getPhotoData(photoId, (error, results) => {
    if (error) {
      response.status(500).send(error.message);
    } else {
      response.status(200).send(results);
    }
  });
});

app.post('/restaurants/:restaurantsID', (req, res) => {
  db.addRestaurant(req.body.name, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

app.put('/restaurants/:restaurantsID', (req, res) => {
  db.updateRestaurant(req.body.name, req.body.id, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

app.delete('/restaurants/:restaurantsID', (req, res) => {
  console.log(req.body.name, req.body.id);
  db.deleteRestaurant(req.body.id, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

app.listen(2000, () => {
  console.log('listening on port 2000');
});
