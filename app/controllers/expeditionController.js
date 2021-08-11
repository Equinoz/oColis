/**
 * @module expeditionController 
 * @description This module provide expeditions controller
 */

const { Expedition } = require("../models");

const expeditionController = {
  _ckeckTimestamps: datas => {
    let error = null;

    ["starting_time", "ending_time"].forEach(key => {
      if (datas[key] && new Date(datas[key]).toString() === "Invalid Date") {
        error = `${key.slice(0,1).toUpperCase() + key.slice(1,)} must be a valid timestamp`;
      }
    });

    return error;
  },

  getAllExpeditions: async (_, res, next) => {
    try {
      const expeditions = await Expedition.findAll();

      if (expeditions.length < 1) {
        next();
      } else {
        res.status(200).json({ data: expeditions });
      }
    } catch (err) {
      next(err);
    }
  },

  getExpeditionById: async (req, res, next) => {
    try {
      let expeditionId = parseInt(req.params.id, 10);
      expeditionId = (isNaN(expeditionId)) ? null : expeditionId;
      const expedition = await Expedition.findById(expeditionId);

      if (expedition == undefined) {
        next();
      } else {
        res.status(200).json({ data: expedition });
      }
    } catch (err) {
      next(err);
    }
  },

  createExpedition: async (req, res, next) => {
    try {
      if (!req.body.driver_name || !req.body.vehicle_plate) {
        res.status(400).send({ error: "Invalid request: driver name and vehicle plate are required" });
        return;
      }
      const error = expeditionController._ckeckTimestamps(req.body);
      if (error) {
        res.status(400).send({ error });
        return;
      }

      const expedition = new Expedition(req.body);
      const newExpeditionId = await expedition.insert();
      res.status(201).json({ data: newExpeditionId });
    } catch (err) {
      next(err);
    }
  },

  updateExpeditionById: async (req, res, next) => {
    try {
      const error = expeditionController._ckeckTimestamps(req.body);
      if (error) {
        res.status(400).send({ error });
        return;
      }

      let expeditionId = parseInt(req.params.id, 10);
      expeditionId = (isNaN(expeditionId)) ? null : expeditionId;
      let expedition = await Expedition.findById(expeditionId);

      if (expedition == undefined) {
        next();
      } else {
        // New data must be merged with old data before instantiation
        expedition = { ...expedition, ...req.body };
        const updatedExpedition = new Expedition(expedition);
        const result = await updatedExpedition.update();
        res.status(200).json({ data: { modified: result }});
      }
    } catch (err) {
      next(err);
    }
  },

  deleteExpeditionById: async (req, res, next) => {
    try {
      let expeditionId = parseInt(req.params.id, 10);
      expeditionId = (isNaN(expeditionId)) ? null : expeditionId;
      let expedition = await Expedition.findById(expeditionId);

      if (expedition == undefined) {
        next();
      } else {
        // New data must be merged with old data before instantiation
        expedition = { ...expedition, ...req.body };
        const expeditionToDelete = new Expedition(expedition);
        const result = await expeditionToDelete.delete();
        res.status(200).json({ data: { deleted: result }});
      }
    } catch (err) {
      next(err);
    }
  }
};

module.exports = expeditionController;