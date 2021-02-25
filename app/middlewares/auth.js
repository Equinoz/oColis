const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  try {
    // if the token is valid id's user and status' user saved in the locals variables scoped to the request
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    res.locals.userId = decodedToken.userId;
    res.locals.userStatus_id = decodedToken.userStatus_id;
    next();

  } catch (err) {
    if (err.name == "JsonWebTokenError" || err.name == "TokenExpiredError" || err.name == "NotBeforeError") {
      res.status(401).json({ error: err.name });
      return;
    }
    next(err);
  }
};

module.exports = auth;