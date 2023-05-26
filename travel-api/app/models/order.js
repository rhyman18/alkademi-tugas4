'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init({
    tx_id: DataTypes.STRING,
    order_date: DataTypes.DATE,
    go_date: DataTypes.DATE,
    fee: DataTypes.INTEGER,
    total_cost: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    customer_id: DataTypes.INTEGER,
    car_id: DataTypes.INTEGER,
    destination_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
