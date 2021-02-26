/**
 * @module packageRouter 
 * @description This module provide routes for packages CRUD
 */

const express = require("express"),
      router = express.Router();

const { packageController } = require("../controllers");

router.route("/")
  .get(packageController.getAllPackages)
  .post(packageController.createPackage);

router.route("/:id")
  .get(packageController.getPackageById)
  .patch(packageController.updatePackageById)
  .delete(packageController.deletePackageById);

module.exports = router;