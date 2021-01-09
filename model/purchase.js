const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const Product = require('./product');
const Purchase = sequelize.define('Purchase', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    price: {type: DataTypes.INTEGER},
    product_id: {type: DataTypes.INTEGER},
    order_id: {type: DataTypes.INTEGER}
}, {
    // Other model options go here
    tableName: 'purchase'
});

module.exports = Purchase;