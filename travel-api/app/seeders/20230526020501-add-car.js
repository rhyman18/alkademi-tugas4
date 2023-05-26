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
      },
      {
        name: 'DAIHATSU LUXIO',
        license: 'B 7864 VW',
      },
      {
        name: 'TOYOTA HIACE',
        license: 'B 8342 BA',
      },
      {
        name: 'ISUZU ELF MICROBUS',
        license: 'B 3248 AT',
      },
      {
        name: 'TOYOTA ALPHARD',
        license: 'B 8734 ZA',
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
    await queryInterface.bulkDelete('Car', null, {});
  }
};
