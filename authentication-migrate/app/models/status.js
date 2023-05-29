'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Status.belongsTo(models.User, {
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT',
      });
    }
  }
  Status.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    }, title: DataTypes.STRING,
    body: DataTypes.STRING,
    userId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Status',
  });
  return Status;
};
