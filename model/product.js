const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/db');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
}, {
    // Other model options go here
    tableName: 'product'
});

module.exports = Product;