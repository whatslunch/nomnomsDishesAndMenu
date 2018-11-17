const { Pool } = require('pg');
const dotenv = require('dotenv');


dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create Tables
 */
const createTables = () => {
  const queryRes = `CREATE TABLE IF NOT EXISTS
    restaurants(
        restaurantID INT,
        restaurantName TEXT
      )`;
  const queryDish = `CREATE TABLE IF NOT EXISTS
    dishes(
      restaurantID INT,
      dishName TEXT,
      dishPrice real,
      dishDescription TEXT,
      dishReviews real,
      dishPhoto TEXT
    )`;

  pool.query(queryRes)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });

  pool.query(queryDish)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


const readFile = () => {
  const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./restaurant.csv'),
  });

  lineReader.on('line', (line) => {
    if (line) {
      const tmp = JSON.parse(line);
      console.log(tmp.restaurantname);
      const queryInsertRes = `INSERT INTO restaurants(restaurantid, restaurantname) VALUES('${tmp.restaurantID}','${tmp.restaurantname}')`;
      pool.query(queryInsertRes)
        .then((res) => {
          for (let k = 0; k < tmp.dishes.length; k++) {
            const queryInsert = `INSERT INTO dishes(restaurantid, dishName, dishPrice, dishDescription, dishReviews, dishPhoto) VALUES('${tmp.restaurantID}','${tmp.dishes[k].dishName}', '${tmp.dishes[k].dishPrice}','${tmp.dishes[k].dishDescription}','${tmp.dishes[k].dishReviews}', '${tmp.dishes[k].dishPhoto}')`;
            pool.query(queryInsert)
              .then((res) => {
                //pool.end();
              })
              .catch((err) => {
                //pool.end();
              });
          }
        })
        .catch((err) => {
          pool.end();
        });
    }
  });
};
/**
 * Drop Tables
 */
const dropTables = () => {
  const queryText = 'DROP TABLE IF EXISTS dishes, restaurants';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createTables,
  dropTables,
  readFile,
};

require('make-runnable');
