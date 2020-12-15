'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LikesConnection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  LikesConnection.init({
    user_id: DataTypes.INTEGER,
    qwitt_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'LikesConnection',
  });
  return LikesConnection;
};