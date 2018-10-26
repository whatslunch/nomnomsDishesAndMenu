var faker = require('faker');
var fs = require('fs');

// SEED restaurant table
var randomRestName;
var randomDishName;
var randomDishDescription;

var x = 0;
while (x < 100) {
  randomRestName = faker.lorem.word();
  fs.appendFile('./database/schema.sql', `INSERT INTO restaurants (name) VALUES ("${randomRestName}"); \n`, (err) => {
    if (err) throw err;
    console.log(`restaurant info was appended to file!`);
  });
  x++;
}

//  SEED dishes table
var randomNum;
var randomDescription;
var precision = 100;

var y = 1;
while (y < 100) {

  for (var z = 0; z < 15; z++) {
    randomDishName = faker.lorem.word();
    randomDescription = faker.lorem.words();
    randomNum = Math.floor(Math.random() * (10 * precision - 1 * precision) + 1 * precision) / (1 * precision);

    fs.appendFile('./database/schema.sql', `INSERT INTO dishes (restaurant_id, name, price, description) VALUES (${y}, "${randomDishName}", ${randomNum}, "${randomDescription}"); \n`, (err) => {
      if (err) throw err;
      console.log('dishe info was appended to the file!');
    });
  }
  y++;
}

// SEED photos table
var filePathBase = 'https://s3.us-east-2.amazonaws.com/yelpsfphotos/';
var photoURLs = ['download (1).jpeg', 'download.jpeg', 'images (1).jpeg', 'images (10).jpeg', 'images (11).jpeg', 'images (12).jpeg', 'images (13).jpeg', 'images (14).jpeg', 'images (15).jpeg', 'images (16).jpeg', 'images (17).jpeg', 'images (18).jpeg', 'images (19).jpeg', 'images (2).jpeg', 'images (20).jpeg', 'images (21).jpeg', 'images (22).jpeg', 'images (23).jpeg', 'images (24).jpeg', 'images (25).jpeg', 'images (26).jpeg', 'images (27).jpeg', 'images (28).jpeg', 'images (29).jpeg', 'images (3).jpeg', 'images (30).jpeg', 'images (31).jpeg', 'images (5).jpeg', 'images (6).jpeg', 'images (7).jpeg', 'images (8).jpeg', 'images (9).jpeg', 'images.jpeg', 'ls.jpg'];

var urlsWithBase = photoURLs.map(url => {
  return filePathBase + url;
});

// photoURLS length is 34... loop through these a few times to insert rows for photos after dinner!





