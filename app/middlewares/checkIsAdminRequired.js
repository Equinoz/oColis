/**
 * @module checkIsAdminRequired
 * @description This module provide middleware to check if the action requires administrator status
 */

const { User } = require("../models");

// Check if the user have the permission to modify another profile than his
const checkIsAdminRequired = async (req, res, next) => {
  let userId = parseInt(req.params.id, 10);
  userId = (isNaN(userId)) ? null : userId;
  const userToModify = await User.findById(userId, true);

  if (!userToModify) {
    res.status(404).send({ error: "Resource not found" });
    return;
  } else if ((res.locals.userId != userId) && (res.locals.userStatus_id == 2 || userToModify.status_id == 1)) {
    res.status(403).send({ error: "Invalid user's status" });
    return;
  }
  next();
};

module.exports = checkIsAdminRequired;