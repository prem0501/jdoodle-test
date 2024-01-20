const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	const Users = sequelize.define(
		'Users',
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				unique: true,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: DataTypes.STRING,
			},
			email: {
				type: DataTypes.STRING,
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
			},
			image: {
				type: DataTypes.STRING,
			},
			genderId: {
				type: DataTypes.INTEGER,
			},
			createdAt: {
				type: DataTypes.DATE,
				defaultValue: new Date(),
			},
			updatedAt: {
				type: DataTypes.DATE,
			},
			deletedAt: {
				type: DataTypes.DATE,
			},
		},
		{
			sequelize,
			paranoid: true,
		},
		{
			indexes: {
				using: 'BTREE',
				fields: ['id', 'name'],
			},
		}
	);

	return Users;
};
