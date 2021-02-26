const { User } = require("../models");

// check if the user have the permission to modify another profile than his
const checkIsAdminRequired = async (req, res, next) => {
  let userId = parseInt(req.params.id, 10);
  userId = (isNaN(userId)) ? null : userId;
  const userToModify = await User.findByIdWithDetails(userId);

  if ((res.locals.userId != userId) && (res.locals.userStatus_id == 2 || userToModify.status_id == 1)) {
    res.status(403).send({ error: "Invalid user's status" });
    return;
  }
  next();
};

module.exports = checkIsAdminRequired;