'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Terminals', [
      {name: 'JAKARTA', createdAt: new Date(), updatedAt: new Date()},
      {name: 'BANDUNG', createdAt: new Date(), updatedAt: new Date()},
      {name: 'YOGYAKARTA', createdAt: new Date(), updatedAt: new Date()},
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Terminals', null, {});
  },
};
