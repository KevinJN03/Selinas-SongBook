const {Sequelize, DataTypes, Model} = require('sequelize');
const db = require('../db/db');
const User = require('./User');

class Song extends Model{}

Song.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING,

    },
    releaseYear: {
        type: DataTypes.INTEGER
    },
    album: {
        type: DataTypes.STRING,
    },
    artist: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type:DataTypes.INTEGER,
        references:{
            model: User, key: 'id'
        }, 
        defaultValue: null
    }

}, {
    sequelize: db,
    modelName: 'Song'
})

module.exports = Song;