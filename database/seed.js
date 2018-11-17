const faker = require('faker');
const fs = require('fs');

const stream = fs.createWriteStream('./restaurant.csv');

const precision = 100;
let i = 0;
let j = 0;

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));


const filePathBase = 'https://s3.us-east-2.amazonaws.com/yumpsfphotos/';
const photoURLs = [];
for (let k = 1; k < 36; k++) {
  photoURLs.push(`${filePathBase + k}.jpeg`);
}

stream.on('drain', () => {
  write();
});
write();

function write() {
  while (i < 10) {
    j = 0;
    const obj = {};
    obj.restaurantID = i;
    obj.restaurantname = faker.lorem.word() + i;
    obj.dishes = [];
    while (j < 15) {
      var dish = {};
      dish.dishName = faker.lorem.word();
      dish.dishPrice = Math.floor(Math.random() * (10 * precision - 1 * precision) + 1 * precision) / (1 * precision);
      dish.dishDescription = faker.lorem.words();
      dish.dishReviews = getRandomInt(100);
      dish.dishPhoto = photoURLs[getRandomInt(34)];
      obj.dishes.push(dish);
      j += 1;
    }
    i += 1;
    let jsonObject = JSON.stringify(obj);
    if (!stream.write(`\n${  jsonObject}`)) {
      return;
    }
    // j = 0;
  }
  stream.end();
}
