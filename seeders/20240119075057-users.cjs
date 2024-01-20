'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
async function addRolesGenders(queryInterface) {
	try {
		await queryInterface.bulkInsert(
			'Genders',
			[
				{
					gender: 'Male',
				},
				{
					gender: 'Female',
				},
				{
					gender: 'Non binary',
				},
			],
			{
				updateOnDuplicate: ['gender'],
			}
		);
	} catch (e) {
		console.log('roles and genders', e);
	}
}
module.exports = {
	async up(queryInterface, Sequelize) {
		await addRolesGenders(queryInterface);
		try {
			const [__, genders] = await queryInterface.sequelize.query(
				'SELECT id from Genders WHERE gender = "Male";',
				{ type: Sequelize.SELECT }
			);
			await queryInterface.bulkInsert(
				'Users',
				[
					{
						email: 'prem@gmail.com',
						password: bcrypt.hashSync('prem0501', 8),
						image: '',
						name: 'Prem',
						genderId: genders[0]?.id,
					},
				],
				{}
			);
		} catch (e) {
			console.log('select', e);
		}
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete('Users', null, {});
		await queryInterface.bulkDelete('Genders', null, {});
	},
};
