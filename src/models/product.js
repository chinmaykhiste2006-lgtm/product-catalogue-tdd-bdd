const { DataTypes, Op } = require('sequelize');
const sequelize = require('../db');
const Category = Object.freeze({
  UNKNOWN: 'Unknown', CLOTHS: 'Cloths', FOOD: 'Food',
  HOUSEWARES: 'Housewares', AUTOMOTIVE: 'Automotive', TOOLS: 'Tools'
});
const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  available: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  category: { type: DataTypes.STRING, allowNull: false, defaultValue: Category.UNKNOWN }
}, { timestamps: false, tableName: 'products' });
Product.Category = Category;
Product.serialize = function() { return this.toJSON(); };
Product.findByName = function(name) { return this.findAll({ where: { name } }); };
Product.findByCategory = function(category) { return this.findAll({ where: { category } }); };
Product.findByAvailability = function(available) { return this.findAll({ where: { available } }); };
module.exports = Product;
