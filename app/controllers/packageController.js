/**
 * @module packageController 
 * @description This module provide packages controller
 */

const { Package, Expedition, Place } = require("../models");

const packageController = {
  _checkDatas: async datas => {
    let error = null;

    ["weight", "volume", "worth", "sender_id", "recipient_id", "expedition_id"].forEach(key => {
      if (datas[key] && !Number.isInteger(datas[key])) {
        error = `${key.slice(0,1).toUpperCase() + key.slice(1,)} must be an integer`;
      }
    });

    // ["sender_id", "recipient_id"].forEach(key => {
    //   if (datas[key] && ! await Place.findById(datas[key])) {
    //     error = `Invalid request: place with id ${datas[key]} doesn't exist. Maybe you should create it`;
    //   }
    // });

    if (datas.sender_id && ! await Place.findById(datas.sender_id)) {
      error = `Invalid request: place with id ${datas.sender_id} doesn't exist. Maybe you should create it`;
    }

    if (datas.recipient_id && ! await Place.findById(datas.recipient_id)) {
      error = `Invalid request: place with id ${datas.recipient_id} doesn't exist. Maybe you should create it`;
    }

    if (datas.expedition_id && ! await Expedition.findById(datas.expedition_id)) {
      error = `Invalid request: expedition with id ${datas.expedition_id} doesn't exist. Maybe you should create it`;
    }

    return error;
  },

  getAllPackages: async (_, res, next) => {
    try {
      const packages = await Package.findAll();

      if (packages.length < 1) {
        next();
      } else {
        res.status(200).json({ data: packages });
      }
    } catch (err) {
      next(err);
    }
  },

  getPackageById: async (req, res, next) => {
    try {
      let packageId = parseInt(req.params.id, 10);
      packageId = (isNaN(packageId)) ? null : packageId;
      const package = await Package.findById(packageId);

      if (package == undefined) {
        next();
      } else {
        res.status(200).json({ data: package });
      }
    } catch (err) {
      next(err);
    }
  },

  createPackage: async (req, res, next) => {
    try {
      if (!req.body.serial_number || !req.body.content_description || !req.body.weight || !req.body.volume || !req.body.worth || !req.body.sender_id || !req.body.recipient_id || !req.body.expedition_id) {
        res.status(400).send({ error: "Invalid request: all the fields are required" });
        return;
      }

      const error = await packageController._checkDatas(req.body);
      if (error) {
        res.status(400).send({ error });
        return;
      }

      const package = new Package(req.body);
      const newPackageId = await package.insert();
      res.status(201).json({ data: newPackageId });
    } catch (err) {
      next(err);
    }
  },

  updatePackageById: async (req, res, next) => {
    try {
      let packageId = parseInt(req.params.id, 10);
      packageId = (isNaN(packageId)) ? null : packageId;
      let package = await Package.findById(packageId);

      const error = await packageController._checkDatas(req.body);
      if (error) {
        res.status(400).send({ error });
        return;
      }

      if (package == undefined) {
        next();
      } else {
        // New data must be merged with old data before instantiation
        package = { ...package, ...req.body };
        const updatedPackage = new Package(package);
        const result = await updatedPackage.update();
        res.status(200).json({ data: { modified: result }});
      }
    } catch (err) {
      next(err);
    }
  },

  deletePackageById: async (req, res, next) => {
    try {
      let packageId = parseInt(req.params.id, 10);
      packageId = (isNaN(packageId)) ? null : packageId;
      let package = await Package.findById(packageId);

      if (package == undefined) {
        next();
      } else {
        // New data must be merged with old data before instantiation
        package = { ...package, ...req.body };
        const packageToDelete = new Package(package);
        const result = await packageToDelete.delete();
        res.status(200).json({ data: { deleted: result }});
      }
    } catch (err) {
      next(err);
    }
  }
};

module.exports = packageController;