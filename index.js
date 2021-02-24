require("dotenv").config();

const express = require("express"),
      router = require("./app/routers");
      // { cors } = require("./app/middlewares");

const app = express();

const PORT = process.env.PORT || 5000,
      HOST = process.env.HOST || "localhost";

app.use(express.json())
  .use(router);

app.listen(PORT, () => {
  console.log(`Server listening at http://${HOST}:${PORT}`);
});