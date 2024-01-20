'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			'Users',
			{
				id: {
					type: Sequelize.INTEGER,
					allowNull: false,
					unique: true,
					primaryKey: true,
					autoIncrement: true,
				},
				name: {
					type: Sequelize.STRING,
				},
				email: {
					type: Sequelize.STRING,
					unique: true,
				},
				password: {
					type: Sequelize.STRING,
				},
				image: {
					type: Sequelize.STRING,
				},
				genderId: {
					type: Sequelize.INTEGER,
				},
				createdAt: {
					type: Sequelize.DATE,
					defaultValue: new Date(),
				},
				updatedAt: {
					type: Sequelize.DATE,
				},
				deletedAt: {
					type: Sequelize.DATE,
				},
			},
			{
				indexes: {
					unique: true,
					fields: ['id'],
				},
			}
		);
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Users');
	},
};
