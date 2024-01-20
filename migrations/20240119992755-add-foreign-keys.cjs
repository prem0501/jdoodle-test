module.exports = {
	/**
	 * @param {import('sequelize').QueryInterface} queryInterface
	 * @param {import('sequelize').Sequelize} Sequelize
	 */
	up: async (queryInterface) => {
		await queryInterface.addConstraint('Users', {
			fields: ['genderId'],
			type: 'foreign key',
			name: 'users_genders_id_fkey',
			references: {
				table: 'Genders',
				field: 'id',
			},
		});
		await queryInterface.addConstraint('Leaderboard', {
			fields: ['userId'],
			type: 'foreign key',
			name: 'leaderboard_user_id_fkey',
			onDelete: 'CASCADE',
			references: {
				table: 'Users',
				field: 'id',
			},
		});
	},
	/**
	 * @param {import('sequelize').QueryInterface} queryInterface
	 * @param {import('sequelize').Sequelize} Sequelize
	 */
	down: async (queryInterface) => {
		await queryInterface.removeConstraint(
			'Leaderboard',
			'leaderboard_user_id_fkey'
		);
	},
};
