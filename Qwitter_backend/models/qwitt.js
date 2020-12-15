'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Qwitt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Qwitt.init({
    username: DataTypes.STRING,
    quote: DataTypes.STRING,
    author: DataTypes.STRING,
    image: DataTypes.STRING,
    likesCount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Qwitt',
  });
  return Qwitt;
};