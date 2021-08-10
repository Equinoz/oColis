/**
 * @module packageRouter 
 * @description This module provide routes for packages CRUD
 */

const express = require("express"),
      router = express.Router();

const { packageController } = require("../controllers"),
      { auth } = require("../middlewares");

router.route("/")
  .get(packageController.getAllPackages)
  .post(auth, packageController.createPackage);

router.route("/:id")
  .get(packageController.getPackageById)
  .patch(auth, packageController.updatePackageById)
  .delete(auth, packageController.deletePackageById);

module.exports = router;