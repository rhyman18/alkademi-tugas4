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
    await queryInterface.bulkInsert('Cars', [
      {
        name: 'SUZUKI APV',
        license: 'B 3746 VM',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'DAIHATSU LUXIO',
        license: 'B 7864 VW',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'TOYOTA HIACE',
        license: 'B 8342 BA',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'ISUZU ELF MICROBUS',
        license: 'B 3248 AT',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'TOYOTA ALPHARD',
        license: 'B 8734 ZA',
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
    await queryInterface.bulkDelete('Cars', null, {});
  },
};
