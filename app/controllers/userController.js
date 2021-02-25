// ajouter login, logout, empêcher changement de status user sauf si admin, JSDoc
const bcrypt = require("bcrypt"),
      jwt = require("jsonwebtoken"),
      { User } = require("../models");

const userController = {
  getAllUsers: async (_, res, next) => {
    try {
      const users = await User.findAll();

      if (users.length < 1) {
        next();
      } else {
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
        res.status(200).json({ data: user });
      }
    } catch (err) {
      next(err);
    }
  },

  createUser: async (req, res, next) => {
    try {
      // Add salt and hash user password
      req.body.status_id = 2;
      req.body.salt = bcrypt.genSaltSync();
      req.body.password = bcrypt.hashSync(req.body.password + req.body.salt, 10);

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
      if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password + user.salt, 10);
      }

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
  },

  // If mail's user exists and password matches returns a web token
  loginUser: async (req, res, next) => {
    if (!req.body.mail || !req.body.password) {
        res.status(400).send({ error: "Invalid keys" });
    }
    const { mail, password } = { ...req.body };

    try {
      const user = await User.findByMail(mail);
      const validPassword = (user) ? bcrypt.compareSync(password + user.salt, user.password) : null;

      if (!user || !validPassword) {
        res.status(401).end();
      } else {
        res.status(200).json({
          data: {
            userId: user.id,
            token: jwt.sign(
              {
                userId: user.id,
                userStatus_id: user.status_id
              },
              process.env.SECRET_TOKEN
            )
          }
        });
      }
    } catch(err) {
      next(err);
    }
  }
};

module.exports = userController;