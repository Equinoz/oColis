/**
 * @module expeditionRouter 
 * @description This module provide routes for expeditions CRUD
 */

const express = require("express"),
      router = express.Router();

const { expeditionController } = require("../controllers"),
      { auth } = require("../middlewares");

router.route("/")
  .get(expeditionController.getAllExpeditions)
  .post(auth, expeditionController.createExpedition);

router.route("/:id")
  .get(expeditionController.getExpeditionById)
  .patch(auth, expeditionController.updateExpeditionById)
  .delete(auth, expeditionController.deleteExpeditionById);

module.exports = router;