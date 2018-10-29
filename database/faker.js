var faker = require('faker');
var fs = require('fs');
var _ = require('underscore');

// 100 restaurants
// 15 dishes per restaurant
// 2999 photos
// 1485 dishes
// 3998 entries in dishes_photos

var getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};


// SEED restaurant table ********************************************************************
var randomRestName;
var randomDishName;
var randomDishDescription;

// make an array of 100 unique restaurant names
var arrOfRestNames = [];

while (arrOfRestNames.length < 100) {
  randomRestName = faker.lorem.word();
  arrOfRestNames.push(randomRestName);
  arrOfRestNames = _.uniq(arrOfRestNames);
}

arrOfRestNames.forEach((name) => {
  fs.appendFile('./database/schema.sql', `INSERT INTO restaurants (name) VALUES ("${name}"); \n`, (err) => {
    if (err) {
      throw err;
    }
    console.log('restaurant info was appended to file!');
  });
});



//  SEED dishes table ***********************************************************************
var randomNum;
var randomDescription;
var precision = 100;
var randomNumOfReviews;

var y = 1;
while (y < 100) {

  var randomDishNames = [];

  while (randomDishNames.length < 15) {
    randomDishNames.push(faker.lorem.word());
    randomDishNames = _.uniq(randomDishNames);
  }

  for (var i = 0; i < randomDishNames.length; i++) {
    randomDescription = faker.lorem.words();
    randomNum = Math.floor(Math.random() * (10 * precision - 1 * precision) + 1 * precision) / (1 * precision);
    randomNumOfReviews = getRandomInt(100);

    fs.appendFile('./database/schema.sql', `INSERT INTO dishes (restaurant_id, name, price, description, reviews) VALUES (${y}, "${randomDishNames[i]}", ${randomNum}, "${randomDescription}", ${randomNumOfReviews}); \n`, (err) => {
      if (err) {
        throw err;
      }
      console.log('dish info was appended to the file!');
    });
  }

  y++;

}

// SEED photos table *************************************************************************

// create array with urls for the photos
var filePathBase = 'https://s3.us-east-2.amazonaws.com/yumpsfphotos/';
var photoURLs = [];
for (var i = 1; i < 36; i++) {
  photoURLs.push(filePathBase + i + '.jpeg');
}

// i have almost 1500 dishes (15 per restaurant, and 100 restaurants), want to be able to have 2 photos per dish, so should make  3000 photo entries
var randomPhotoURL;
var caption;


for (var m = 1; m < 3000; m++) {
  randomPhotoURL = photoURLs[getRandomInt(34)];
  caption = faker.lorem.words();

  fs.appendFile('./database/schema.sql', `INSERT INTO photos (url, caption) VALUES ("${randomPhotoURL}", "${caption}"); \n`, (err) => {
    if (err) {
      throw err;
    }
    console.log('photo info was appended to the file!');
  });

}

// SEED dishes_photos table *************************************************************************

// I think I have it set up so that there are at least some records that demonstrate the many to many relationship
// and no records repeat each other

// add photo ids 1 - 1484 & dishes ids 1 - 1484
for (var n = 1; n < 1485; n++) {
  fs.appendFile('./database/schema.sql', `INSERT INTO dishes_photos (photos_id, dishes_id) VALUES (${n}, ${n}); \n`, (err) => {
    if (err) {
      throw err;
    }
  });

}

for (var b = 1485; b < 3000; b++) {
  fs.appendFile('./database/schema.sql', `INSERT INTO dishes_photos (photos_id, dishes_id) VALUES (${b}, ${getRandomInt(1484)}); \n`, (err) => {
    if (err) {
      throw err;
    }
  });
}

// add more entries, so that photo_ids point to more than one dish 
for (var n = 1; n < 1000; n++) {
  fs.appendFile('./database/schema.sql', `INSERT INTO dishes_photos (photos_id, dishes_id) VALUES (${n}, ${n + 1}); \n`, (err) => {
    if (err) {
      throw err;
    }
  });

}




