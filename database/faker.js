var faker = require('faker');
var fs = require('fs');

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