const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'sakila',
    'root',
    'root',
    {
        dialect: 'mysql',
        port: '3306',
        host: '46.101.208.229',
        logging: console.log,
        define: {
            timestamps: false
        }
    }
);

module.exports = sequelize;