/**
 * @module index
 * @description This module provide the application's controllers
 */

const placeController = require("./placeController"),
      expeditionController = require("./expeditionController"),
      packageController = require("./packageController"),
      userController = require("./userController");

module.exports = {
  placeController,
  expeditionController,
  packageController,
  userController
};