const { Pool } = require("pg");

const pool = new Pool({ connectionString: process.env.PG_URL });

console.log(`Connection to DB ${process.env.PG_URL} successfull`);

module.exports = pool;