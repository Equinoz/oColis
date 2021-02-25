const cors = (req, res, next) => {
  let origin = "";
  // const whitelist = [];
  // if (~whitelist.lastIndexOf(req.headers.origin)) {
    origin = req.headers.origin;
  // }
  res.setHeader("Access-Control-Allow-Origin", origin);
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Headers", "Authorization");
    res.status(200).end();
  } else {
    next();
  }
};

module.exports = cors;