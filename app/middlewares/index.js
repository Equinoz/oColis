const errors = require("./errors"),
      cors = require("./cors"),
      auth = require("./auth"),
      checkIsAdminRequired = require("./checkIsAdminRequired");

module.exports = {
  errors,
  cors,
  auth,
  checkIsAdminRequired
};