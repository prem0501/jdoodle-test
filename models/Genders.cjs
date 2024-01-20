const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	const Genders = sequelize.define(
		'Genders',
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			gender: {
				type: DataTypes.STRING,
				unique: true,
			},
			createdAt: {
				allowNull: true,
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
				fields: ['id'],
			},
		}
	);
	return Genders;
};
