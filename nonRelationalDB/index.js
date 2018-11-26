const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['localhost:9042', 'keyspace: restaurant'],

  //   authProvider: new cassandra.auth
  //    .PlainTextAuthProvider(‘cassandra’, ‘cassandra’)
});
client.on('end', () => { client.shutdown(); });


const getRestaurantName = function (restaurantId, callback) {
    const query = 'SELECT * FROM restaurant.restaurants WHERE restaurantID = ?';
    client.execute(query, [restaurantId], { prepare: true }, callback);
  };

var getDishes = function (restaurantName, callback) {
    const query = 'SELECT dishes FROM restaurant.restaurants WHERE restaurantname = ?';
    client.execute(query, [restaurantName], { prepare: true }, callback);
};
  
  module.exports = { getDishes, getRestaurantName };