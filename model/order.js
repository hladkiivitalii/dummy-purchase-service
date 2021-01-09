const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const Customer = require('./customer');
const Purchase = require('./purchase');
const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cost: {type: DataTypes.INTEGER},
    customer_id: {type: DataTypes.SMALLINT}
}, {
    // Other model options go here
    tableName: 'order'
});

Order.belongsTo(Customer);
Order.hasMany(Purchase);

module.exports = Order;