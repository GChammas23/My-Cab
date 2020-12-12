var config = {
  PORT: 27017,
  NODE_ENV: 'development',
  HOST: 'localhost',
  DB: 'mydb',
  Collection: ['Users', 'Pricings', 'Rides', 'drivers'],
}

module.exports = { config: config };