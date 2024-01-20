import { Sequelize, type Dialect } from 'sequelize';
import * as fs from 'node:fs';
import * as path from 'node:path';
import type { DB, ModelWithFKeyMap } from '../types/db.interface';
import { pathToFileURL } from 'node:url';
import { defineAssociations } from '~/utils/db';

const config = useRuntimeConfig();

const dialect: Dialect = (config.DIALECT as Dialect) || 'mysql';
const sequelize = new Sequelize(
	config.RDB_NAME || '',
	config.RDB_USER || '',
	config.RDB_PASS,
	{
		host: config.RDB_HOST,
		port: +config.RDB_PORT,
		dialect,
		logging: false,
		pool: {
			max: +(config.RDB_POOL_MAX || 5),
			min: +(config.RDB_POOL_MIN || 0),
			acquire: +(config.RDB_POOL_ACQUIRE || 30000),
			idle: +(config.RDB_POOL_IDLE || 10000),
		},
	}
);

let db: DB & ModelWithFKeyMap = {};
db.sequelize = sequelize;

const folder = path.join(process.cwd(), '/migrations/');

const files = fs.readdirSync(folder);

const modelsFound = files
	.filter((fileName: string) => {
		return (
			fileName.includes('create') &&
			fileName.indexOf('.') !== 0 &&
			fileName.slice(-3) === '.js'
		);
	})
	.map((n: string) => {
		const str = n.substring(n.lastIndexOf('-') + 1);
		return str;
	});
const ps = modelsFound.map(async (fileName: string) => {
	let className =
		fileName.substring(0, 1).toUpperCase() + fileName.substring(1);
	if (className.includes('_'))
		className = className
			.split('_')
			.map((n) => n.substring(0, 1).toUpperCase() + n.substring(1))
			.join('');
	const filepath = path.join(process.cwd(), '/models', className);
	const pathname = pathToFileURL(filepath).pathname;
	const init = (await import(pathname)).default;
	const nameWithoutExt = className.split('.')[0];
	if (!db[nameWithoutExt]) {
		const model = init(db.sequelize);
		db[nameWithoutExt] = model;
	}
});

Promise.all(ps).then(() => {
	defineAssociations(db);
	sequelize
		.authenticate()
		.then(() => {
			console.log('Connection has been established successfully.');
		})
		.catch((error) => {
			console.error('Unable to connect to the database:', error);
		});
});

export default db;
