'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tix_id: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      order_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      go_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      fee: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      total_cost: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      payment_method: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      status: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      CarId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      DestinationId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  },
};
