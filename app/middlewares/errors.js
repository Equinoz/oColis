/**
 * @module errors
 * @description This module provide error 404 and error 500 middlewares
 */

const error404 = (_, res) => {
  res.status(404).send({ error: "Resource not found" });
};

const error500 = (err, _, res, __) => {
  console.log(err)
  res.status(500).json({ error: err });
};

module.exports = {
  error404,
  error500
};