/**
 * @module redisClient 
 * @description This module provide a redis client for handle blacklisted tokens
 */

const redis = require("redis");
const client = redis.createClient();

client.on("error", err => {
  if (err.code == "ECONNREFUSED") {
    throw "Error: redis server must running";
  } else {
    throw err;
  }
});

const redisClient = {
  set: token => new Promise((resolve, reject) => {
    client.set(process.env.KEY_PREFIX + token, "null", err => {
      if (err) reject(err);
      resolve(true);
    });
  }),

  exists: token => new Promise((resolve, reject) => {
    client.exists(process.env.KEY_PREFIX + token, (err, result) => {
      if (err) reject(err);
      if (result > 0) {
        resolve(true);
      } else {
				resolve(false);
			}
    });
  })
};

module.exports = redisClient;