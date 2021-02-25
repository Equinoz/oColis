const express = require("express"),
      router = express.Router();

const { userController } = require("../controllers");

router.route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router.route("/:id")
  .get(userController.getUserById)
  .patch(userController.updateUserById)
  .delete(userController.deleteUserById);

router.route("/login")
  .post(userController.loginUser);

module.exports = router;