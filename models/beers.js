// var orm = require("../config/orm.js");
// var express = require('express');
// var router = express.Router();
var Sequelize = require("sequelize");
var sequelize = require("../config/connection.js");

var Beer = sequelize.define("myBeers", {
  beer_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  brewery: {
    type: Sequelize.STRING,
    defaultValue: null
  },
  genre: {
    type: Sequelize.STRING,
    defaultValue: null
  },
  abv: {
    type: Sequelize.DECIMAL(2,1),
    defaultValue: null
  },
  review: {
    type: Sequelize.TEXT,
    defaultValue: null
  },
  triedIt: {
    type: Sequelize.BOOLEAN,
    defaultValue: null
  },
  rating: {
    type: Sequelize.DECIMAL(2,1),
    defaultValue: null
  }
}, 
{
  timestamps: false
});

Beer.sync();

module.exports = Beer;
