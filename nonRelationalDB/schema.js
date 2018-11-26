const cassandra = require('cassandra-driver');
const async = require('async');
const JSONReader = require('../relationalDB/readJSON.js');

const client = new cassandra.Client({
  contactPoints: ['localhost:9042'],

//   authProvider: new cassandra.auth
//    .PlainTextAuthProvider(‘cassandra’, ‘cassandra’)
});
client.on('end', () => {client.shutdown();});
// client.on("")
function InsertQ(line) {
  return new Promise((resolve, reject) => {
    let result = '[';
    if (line) {
      // console.log(line);
      const tmp = line;
      let query;
      for (let i = 0; i < tmp.dishes.length; i++) {
        let temp = '(';
        for (const key in tmp.dishes[i]) {
          temp += `'${tmp.dishes[i][key]}'` + ',';
        }
        temp = `${temp.slice(0, -1)}),`;
        result += temp;
      }
      result = `${result.slice(0, -1)}]`;

      query = `INSERT INTO restaurants(restaurantid, restaurantname, dishes) VALUES(${tmp.restaurantID},'${tmp.restaurantname}',${result})`;

      client.execute(query, (e, res) => {
        if (e) {
          console.log(e);
          reject(e, null);
        } else {
          resolve();
        }
      });
    }
  });
  // console.log(query);
}

function insertTable2() {
  return new Promise((resolve, reject) => {
    const reader = new JSONReader('./../database/restaurant1.csv');
    reader.read((data) => {
      // data.forEach((line) => {
      // async.eachLimit(data, 10, (line, cb) => {
      // lineReader.on('line', (line) => {
      let w = data.length;
      while (w) {
        InsertQ(data[w]);
        w -= 1;
      }
      reader.continue();
    });
    resolve();
  });
}


function insertTable() {
  return new Promise((resolve, reject) => {
    const lineReader = require('readline').createInterface({
      input: require('fs').createReadStream('./../database/restaurant1.csv'),
    });
    lineReader.on('line', (line) => {
      let result = '[';
      if (line) {
        const tmp = JSON.parse(line);
        let query;
        for (let i = 0; i < tmp.dishes.length; i++) {
          let temp = '(';
          for (const key in tmp.dishes[i]) {
            temp += `'${tmp.dishes[i][key]}'` + ',';
          }
          temp = `${temp.slice(0, -1)}),`;
          result += temp;
        }
        result = `${result.slice(0, -1)}]`;
        query = `INSERT INTO restaurants(restaurantid, restaurantname, dishes) VALUES(${tmp.restaurantID},'${tmp.restaurantname}',${result})`;

        client.execute(query, (e, res) => {
          if (e) {
            reject(e, null);
          } else {
            resolve(null, res);
          }
        });
      }
    });
  });
}

function CassandraQuery(query) {
  return new Promise((resolve, reject) => {
    client.execute(query, (e, res) => {
      if (e) {
        reject(e, null);
      } else {
        resolve(null, res);
      }
    });
  });
}

function Close() {
  return new Promise((resolve, reject) => {
    client.shutdown((e, res) => {
      if (e) {
        reject();
      } else {
        resolve();
      }
    });
  });
}

function sag() {
  CassandraQuery("CREATE KEYSPACE IF NOT EXISTS restaurant WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '3' }")
    .then(() => CassandraQuery('USE restaurant'))
    .then(() => CassandraQuery(`CREATE TYPE IF NOT EXISTS dish  (
            dishName text,
            dishPrice text,
            dishDescription text,
            dishReviews text,
            dishPhoto text
        );`))
    .then(() => CassandraQuery('DROP TABLE IF EXISTS restaurant.restaurants'))
    .then(() => CassandraQuery(`
        CREATE TABLE IF NOT EXISTS restaurants(
            restaurantID int PRIMARY KEY,
            restaurantName text,
            dishes list<frozen <dish>>
        );`))
    .then(() => insertTable2());
    //.then(() => Close());
}

sag();
