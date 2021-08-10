/**
 * @module placeRouter 
 * @description This module provide routes for places CRUD
 */

const express = require("express"),
      router = express.Router();

const { placeController } = require("../controllers"),
      { auth } = require("../middlewares");

router.route("/")
  .get(placeController.getAllPlaces)
  .post(auth, placeController.createPlace);

router.route("/:id")
  .get(placeController.getPlaceById)
  .patch(auth, placeController.updatePlaceById)
  .delete(auth, placeController.deletePlaceById);

module.exports = router;