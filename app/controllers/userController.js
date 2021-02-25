const { User } = require("../models");

const userController = {
  getAllUsers: async (_, res, next) => {
    try {
      const users = await User.findAll();

      if (users.length < 1) {
        next();
      } else {
        for (const user of users) {
          delete user.password;
        }
        res.status(200).json({ data: users });
      }
    } catch (err) {
      next(err);
    }
  },

  getUserById: async (req, res, next) => {
    try {
      let userId = parseInt(req.params.id, 10);
      userId = (isNaN(userId)) ? null : userId;
      const user = await User.findById(userId);

      if (user == undefined) {
        next();
      } else {
        delete user.password;
        res.status(200).json({ data: user });
      }
    } catch (err) {
      next(err);
    }
  },

  createUser: async (req, res, next) => {
    try {
      const user = new User(req.body);
      const newUserId = await user.insert();
      res.status(201).json({ data: newUserId });
    } catch (err) {
      next(err);
    }
  },

  updateUserById: async (req, res, next) => {
    try {
      let userId = parseInt(req.params.id, 10);
      userId = (isNaN(userId)) ? null : userId;
      let user = await User.findById(userId);

      if (user == undefined) {
        next();
      } else {
        // New data must be merged with old data before instantiation
        user = { ...user, ...req.body };
        const updatedUser = new User(user);
        const result = await updatedUser.update();
        res.status(200).json({ data: { modified: result }});
      }
    } catch (err) {
      next(err);
    }
  },

  deleteUserById: async (req, res, next) => {
    try {
      let userId = parseInt(req.params.id, 10);
      userId = (isNaN(userId)) ? null : userId;
      let user = await User.findById(userId);

      if (user == undefined) {
        next();
      } else {
        // New data must be merged with old data before instantiation
        user = { ...user, ...req.body };
        const userToDelete = new User(user);
        const result = await userToDelete.delete();
        res.status(200).json({ data: { deleted: result }});
      }
    } catch (err) {
      next(err);
    }
  }
};

module.exports = userController;