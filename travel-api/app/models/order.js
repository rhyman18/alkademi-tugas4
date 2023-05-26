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
      Order.belongsTo(models.User);
      Order.belongsTo(models.Car);
      Order.belongsTo(models.Destination);
    }
  }
  Order.init({
    tix_id: DataTypes.STRING,
    order_date: DataTypes.DATE,
    go_date: DataTypes.DATE,
    fee: DataTypes.INTEGER,
    total_cost: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    UserId: DataTypes.INTEGER,
    CarId: DataTypes.INTEGER,
    DestinationId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
