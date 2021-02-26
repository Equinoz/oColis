/**
 * @module expeditionRouter 
 * @description This module provide routes for expeditions CRUD
 */

const express = require("express"),
      router = express.Router();

const { expeditionController } = require("../controllers");

router.route("/")
  .get(expeditionController.getAllExpeditions)
  .post(expeditionController.createExpedition);

router.route("/:id")
  .get(expeditionController.getExpeditionById)
  .patch(expeditionController.updateExpeditionById)
  .delete(expeditionController.deleteExpeditionById);

module.exports = router;