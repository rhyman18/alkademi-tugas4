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
     *
    */
    await queryInterface.bulkInsert('Destinations', [
      {
        from_terminal_id: 1,
        to_terminal_id: 2,
        price: 70000,
        mileage: 151,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        from_terminal_id: 1,
        to_terminal_id: 3,
        price: 125000,
        mileage: 562,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        from_terminal_id: 2,
        to_terminal_id: 1,
        price: 45000,
        mileage: 151,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        from_terminal_id: 2,
        to_terminal_id: 3,
        price: 115000,
        mileage: 493,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        from_terminal_id: 3,
        to_terminal_id: 1,
        price: 105000,
        mileage: 562,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        from_terminal_id: 3,
        to_terminal_id: 2,
        price: 125000,
        mileage: 493,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Destinations', null, {});
  },
};
