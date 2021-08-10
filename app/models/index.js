/**
 * @module index
 * @description This module provide the application's models
 */

const Place = require("./place"),
      Expedition = require("./expedition"),
      Package = require("./package"),
      User = require("./user"),
      Token = require("./token");

module.exports = {
  Place,
  Expedition,
  Package,
  User,
  Token
};