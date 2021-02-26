/**
 * @module index
 * @description This module provide the application's routers
 */

const express = require("express");

const placeRouter = require("./placeRouter"),
      expeditionRouter = require("./expeditionRouter"),
      packageRouter = require("./packageRouter"),
      userRouter = require("./userRouter");

const router = express.Router(),
      { auth } = require("../middlewares");

router.use("/place", auth, placeRouter)
      .use("/expedition", auth, expeditionRouter)
      .use("/package", auth, packageRouter)
      .use("/user", userRouter);
  
module.exports = router;