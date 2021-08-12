/**
 * @module index
 * @description This module provide the application's routers
 */

const express = require("express"),
      swaggerUi = require("swagger-ui-express");

const placeRouter = require("./placeRouter"),
      expeditionRouter = require("./expeditionRouter"),
      packageRouter = require("./packageRouter"),
      userRouter = require("./userRouter"),
      swaggerDocument = require("../../swagger.json");

const router = express.Router();

router.use("/api-docs", swaggerUi.serve)
      .get("/api-docs", swaggerUi.setup(swaggerDocument))
      .use("/place", placeRouter)
      .use("/expedition", expeditionRouter)
      .use("/package", packageRouter)
      .use("/user", userRouter);
  
module.exports = router;