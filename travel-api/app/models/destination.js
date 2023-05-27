'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Destination extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Destination.init({
    price: DataTypes.INTEGER,
    mileage: DataTypes.INTEGER,
    from_terminal_id: DataTypes.INTEGER,
    to_terminal_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Destination',
    timestamps: false,
  });
  return Destination;
};
