const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

module.exports = new Sequelize( process.env.DATABASE_URL, {
    host: localhost,
    dialect: 'postgres',

    pool: {
        max: 5,
        min : 0,
        acquire : 300000 ,
        idle :10000
    },
});