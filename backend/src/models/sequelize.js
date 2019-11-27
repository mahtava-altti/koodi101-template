var Sequelize = require('sequelize');

var sequelize = new Sequelize({
  logging: false,
  dialect: 'sqlite',
  storage: './db/db.sqlite',
});

module.exports = sequelize;
