const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/db');

const Customer = sequelize.define('Customer', {
    customer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    store_id: {type: DataTypes.INTEGER},
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    email: {type: DataTypes.STRING},
    address_id: {type: DataTypes.INTEGER},
    active: {type: DataTypes.BOOLEAN},
    create_date: {type: DataTypes.DATE},
    // last_date: {type: DataTypes.DATE}
}, {
    // Other model options go here
    tableName: 'customer'
});

module.exports = Customer;