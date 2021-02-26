/**
 * @module packageController 
 * @description This module provide packages controller
 */

const { Package } = require("../models");

const packageController = {
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