import type { DB } from '~/types/db.interface';

export function defineAssociations(db: DB) {
	console.log(Object.keys(db));
	db.Users.belongsTo(db.Genders, {
		foreignKey: 'genderId',
	});
	db.Genders.hasMany(db.Users);

	db.Users.belongsTo(db.Leaderboard, {
		foreignKey: 'userId',
	});
	db.Leaderboard.hasMany(db.Users);
}
