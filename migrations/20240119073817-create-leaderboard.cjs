'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Leaderboard', {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			userId: {
				type: Sequelize.INTEGER,
				unique: true,
			},
			score: {
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: true,
				type: Sequelize.DATE,
				defaultValue: new Date(),
			},
			updatedAt: {
				type: Sequelize.DATE,
			},
			deletedAt: {
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Leaderboard');
	},
};
