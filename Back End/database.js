var mongo = require("mongodb");
var config = require("./config/config");


var db_config = {
  host: config.config.HOST,
  database: config.config.DB,
  port: config.config.PORT,
  collection: config.config.Collection,
};


module.exports = {
  getClient: function () {
    return mongo.MongoClient;
  },

  getUrl: function () {
    let url = "mongodb://" + db_config.host + ":" + db_config.port + "/";
    return url;
  },

  getDatabase: function () {
    return db_config.database;
  },

  getUserCollection: function () {
    return db_config.collection[0];
  },

  getPricingsCollection: function () {
    return db_config.collection[1];
  },

  getRidesCollection: function () {
    return db_config.collection[2];
  },

  getDriversCollection: function () {
    return db_config.collection[3];
  }

};
