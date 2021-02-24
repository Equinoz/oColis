const express = require("express");

const placeRouter = require("./placeRouter");

const router = express.Router();

router.use("/place", placeRouter);
  
module.exports = router;