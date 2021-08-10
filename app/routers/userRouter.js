/**
 * @module userRouter 
 * @description This module provide routes for users CRUD and login/logout
 */

const express = require("express"),
      router = express.Router();

const { userController } = require("../controllers"),
      { auth, checkIsAdminRequired } = require("../middlewares");

router.route("/")
  .get(auth, userController.getAllUsers)
  .post(userController.createUser);

router.route("/:id")
  .get(auth, userController.getUserById)
  .patch(auth, checkIsAdminRequired, userController.updateUserById)
  .delete(auth, checkIsAdminRequired, userController.deleteUserById);

router.route("/login")
  .post(userController.loginUser);

router.route("/logout")
  .get(auth, userController.logoutUser);

module.exports = router;