'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Status);
      User.belongsToMany(models.Role, {
        through: 'UserRoles',
        foreignKey: 'userId',
      });
    }
  }
  User.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    }, name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    alamat: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
