/**
 * @module placeController 
 * @description This module provide places controller
 */

const { Place } = require("../models");

const placeController = {
  getAllPlaces: async (_, res, next) => {
    try {
      const places = await Place.findAll();

      if (places.length < 1) {
        next();
      } else {
        res.status(200).json({ data: places });
      }
    } catch (err) {
      next(err);
    }
  },

  getPlaceById: async (req, res, next) => {
    try {
      let placeId = parseInt(req.params.id, 10);
      placeId = (isNaN(placeId)) ? null : placeId;
      const place = await Place.findById(placeId);

      if (place == undefined) {
        next();
      } else {
        res.status(200).json({ data: place });
      }
    } catch (err) {
      next(err);
    }
  },

  createPlace: async (req, res, next) => {
    try {
      const place = new Place(req.body);
      const newPlaceId = await place.insert();
      res.status(201).json({ data: newPlaceId });
    } catch (err) {
      next(err);
    }
  },

  updatePlaceById: async (req, res, next) => {
    try {
      let placeId = parseInt(req.params.id, 10);
      placeId = (isNaN(placeId)) ? null : placeId;
      let place = await Place.findById(placeId);

      if (place == undefined) {
        next();
      } else {
        // New data must be merged with old data before instantiation
        place = { ...place, ...req.body };
        const updatedPlace = new Place(place);
        const result = await updatedPlace.update();
        res.status(200).json({ data: { modified: result }});
      }
    } catch (err) {
      next(err);
    }
  },

  deletePlaceById: async (req, res, next) => {
    try {
      let placeId = parseInt(req.params.id, 10);
      placeId = (isNaN(placeId)) ? null : placeId;
      let place = await Place.findById(placeId);

      if (place == undefined) {
        next();
      } else {
        // New data must be merged with old data before instantiation
        place = { ...place, ...req.body };
        const placeToDelete = new Place(place);
        const result = await placeToDelete.delete();
        res.status(200).json({ data: { deleted: result }});
      }
    } catch (err) {
      next(err);
    }
  }
};

module.exports = placeController;