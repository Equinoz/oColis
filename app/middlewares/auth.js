/**
 * @module auth 
 * @description This module provide authentification middleware
 */

const jwt = require("jsonwebtoken"),
      { User, Token } = require("../models");

const auth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      const error = new Error();
      error.name = "JsonWebTokenError";
      throw error;
    }

    const token = req.headers.authorization.split(' ')[1];

    // Check if the token isn't in the blacklist
    if (await Token.exists(token)) {
      throw "Token already used";
    }

    // If the token is valid id's user and status' user saved in the locals variables scoped to the request
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    if (! await User.findById(decodedToken.userId)) {
      const error = new Error();
      error.name = "UserDoesNotExistError";
      throw error;
    }

    res.locals.userId = decodedToken.userId;
    res.locals.userStatus_id = decodedToken.userStatus_id;

    next();
  } catch (err) {
    if (err.name == "JsonWebTokenError" || err.name == "TokenExpiredError" || err.name == "NotBeforeError" || err.name == "UserDoesNotExistError") {
      res.status(401).json({ error: err.name });
      return;
    }
    next(err);
  }
};

module.exports = auth;