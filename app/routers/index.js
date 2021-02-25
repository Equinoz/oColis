const express = require("express");

const placeRouter = require("./placeRouter"),
      expeditionRouter = require("./expeditionRouter");

const router = express.Router();

router.use("/place", placeRouter)
      .use("/expedition", expeditionRouter);
  
module.exports = router;