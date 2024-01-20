const mysql = require('mysql2/promise');
require('dotenv').config();
const dbName = process.env.RDB_NAME;

mysql
	.createConnection({
		host: process.env.RDB_HOST,
		port: process.env.RDB_PORT,
		user: process.env.RDB_USER,
		password: process.env.RDB_PASS,
	})
	.then((connection) => {
		connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`).then((res) => {
			console.info('Database create or successfully checked');
			process.exit(0);
		});
	});
