var Sequelize = require('sequelize');
var sequelize = require('./sequelize');

var ChatMessage = sequelize.define('chats', {
  temperature: Sequelize.TEXT,
  pressure: Sequelize.TEXT,
  light: Sequelize.TEXT,
  red: Sequelize.INTEGER,
  green: Sequelize.INTEGER,
  blue: Sequelize.INTEGER,
}, {
  timestamps: true,
  instanceMethods: {
    toJSON: async function () {
      return {
        // This is a unique id that is generated automatically
        id: this.id,
        // This also comes for free
        createdAt: this.createdAt,
        temperature: this.temperature,
	pressure: this.pressure,
	light: this.light,
	red: this.red,
	green: this.green,
	blue: this.blue,
      };
    },
  },
});

module.exports = ChatMessage;
