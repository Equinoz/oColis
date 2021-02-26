/**
 * @module placeRouter 
 * @description This module provide routes for places CRUD
 */

const express = require("express"),
      router = express.Router();

const { placeController } = require("../controllers");

router.route("/")
  .get(placeController.getAllPlaces)
  .post(placeController.createPlace);

router.route("/:id")
  .get(placeController.getPlaceById)
  .patch(placeController.updatePlaceById)
  .delete(placeController.deletePlaceById);

module.exports = router;