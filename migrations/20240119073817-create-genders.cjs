'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Genders', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			gender: {
				type: Sequelize.STRING,
				unique: true,
			},
			createdAt: {
				allowNull: false,
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
		await queryInterface.dropTable('Genders');
	},
};
