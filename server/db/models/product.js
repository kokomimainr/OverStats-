'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {foreignKey: "userId"});
    }
  }
  Product.init({
    image: DataTypes.TEXT,
    name: DataTypes.TEXT,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    article: DataTypes.TEXT,
    amount: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};