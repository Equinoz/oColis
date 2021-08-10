/**
 * @module index 
 * @description This module provide a mysql clients
 */

const mysql = require("mysql2/promise"),
			bluebird = require('bluebird');

const client = async function() {
	return await mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		Promise: bluebird
	});
};
// await client.connect(err => {
// 	if (err) {
// 		throw err;
// 	}

// 	console.log(`Connection to DB ${process.env.DB_DATABASE} successfull`);
// });

module.exports = { client };