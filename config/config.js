import { config } from 'dotenv';
config();

export default {
	development: {
		username: process.env.RDB_USER,
		password: process.env.RDB_PASS,
		database: process.env.RDB_NAME,
		host: process.env.RDB_HOST,
		port: process.env.RDB_PORT || 3306,
		dialect: process.env.DIALECT || 'mysql',
	},
	production: {
		username: process.env.RDB_USER,
		password: process.env.RDB_PASS,
		database: process.env.RDB_NAME,
		host: process.env.RDB_HOST,
		port: process.env.RDB_PORT,
		dialect: process.env.DIALECT || 'mysql',
	},
};
