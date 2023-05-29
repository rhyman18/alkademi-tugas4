'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const roles_data = [
      {
        name: 'USER',
      },
      {
        name: 'ADMIN',
      },
      {
        name: 'PM',
      },
    ];
    await queryInterface.bulkInsert('roles', roles_data);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
