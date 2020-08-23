const { Sequelize , DataTypes } = require('sequelize');
const db = require('../config/database')

const anime = db.define('anime',{
    name: {
        type : DataTypes.STRING,
        allowNull: false,
        primaryKey : true,
    },
    altName: {
        type : DataTypes.STRING
    },
    nameLink: {
        type : DataTypes.STRING
    },
    image: {
        type : DataTypes.STRING(400)
    },
    type: {
        type : DataTypes.STRING
    },
    episodes: {
        type : DataTypes.INTEGER
    },
    rating: {
        type : DataTypes.FLOAT
    },
    plot: {
        type : DataTypes.STRING(10000)
    },
    source: {
        type : DataTypes.STRING
    },
    year: {
        type : DataTypes.INTEGER
    },
    tags: {
        type : DataTypes.STRING(1000)
    },
})
anime.sync().then(() => {
    console.log('table created');
  });
module.exports = anime;