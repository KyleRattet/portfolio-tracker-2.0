var config = {};

config.mongoURI = {
  development: 'mongodb://localhost/node-testing',
  test: 'mongodb://localhost/node-test',
  production: process.env.MONGOLAB_URI
};

module.exports = config;
