const express = require("express");

const placeRouter = require("./placeRouter"),
      expeditionRouter = require("./expeditionRouter"),
      packageRouter = require("./packageRouter"),
      userRouter = require("./userRouter");

const router = express.Router();

router.use("/place", placeRouter)
      .use("/expedition", expeditionRouter)
      .use("/package", packageRouter)
      .use("/user", userRouter);
  
module.exports = router;