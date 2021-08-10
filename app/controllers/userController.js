/**
 * @module userController 
 * @description This module provide users controller
 */

const bcrypt = require("bcrypt"),
      jwt = require("jsonwebtoken"),
      { User, Token } = require("../models");

const userController = {
  _emailRegex: /^\w+@\w+\.\w+$/,
  _passwordRegex: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$%^&*-]).{8,}/,

  _checkDatas: async datas => {
    if (datas.email) {
      // Check the email's validity
      if (!userController._emailRegex.test(datas.email)) {
        return "Mail address must be valid";
      }

      // Check if mail address is already in use
      const existingUser = await User.findByMail(datas.email);
      if (existingUser) {
        return "Mail address already in use";
      }
    }

    // Check the password's complexity
    if (datas.password && !userController._passwordRegex.test(datas.password)) {
      return "Password must be too strong";
    }

    return false;
  },

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
      if (!req.body.email || !req.body.password) {
          res.status(400).send({ error: "Invalid keys" });
          return;
      }

      const error = await userController._checkDatas(req.body);
      if (error) {
        res.status(400).send({ error });
        return;
      }

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
      let user = await User.findById(userId, true);

      if (req.body.status_id && (res.locals.userId == userId && user.status_id == 2)) {
        res.status(403).send({ error: "User can't change his own status" });
        return;
      }

      const error = await userController._checkDatas(req.body);
      if (error) {
        res.status(400).send({ error });
        return;
      }

      if (req.body.password) {
        // Hash user password
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
      let user = await User.findById(userId, true);

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
    if (!req.body.email || !req.body.password) {
        res.status(400).send({ error: "Invalid keys" });
    }
    const { email, password } = { ...req.body };

    try {
      const user = await User.findByMail(email);
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
      console.log(err)
      next(err);
    }
  },

  // Adding the user's token to the blacklist for logout
  logoutUser: (req, res) => {
    const token = req.headers.authorization;
    const blacklistedToken = new Token({ value: token });
    blacklistedToken.add();

    res.status(204).end();
  }
};

module.exports = userController;