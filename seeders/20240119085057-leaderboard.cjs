'use strict';

module.exports = {
	async up(_) {},

	async down(queryInterface) {
		await queryInterface.bulkDelete('Leaderboard', null, {});
	},
};
