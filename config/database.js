const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

module.exports = new Sequelize( process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'postgres',

    pool: {
        max: 5,
        min : 0,
        acquire : 300000 ,
        idle :10000
    },
});