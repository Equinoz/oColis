/**
 * @module index 
 * @description This module provide a mysql clients
 */

const mysql = require("mysql2/promise");

const client = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE
});

module.exports = { client };