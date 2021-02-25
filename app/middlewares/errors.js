const error404 = (_, res) => {
  res.status(404).send({ error: "Resource not found" });
};

const error500 = (err, _, res, __) => {
  res.status(500).json({ error: err });
};

module.exports = {
  error404,
  error500
};