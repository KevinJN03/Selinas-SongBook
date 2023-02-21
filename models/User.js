const {Sequelize, DataTypes, Model} = require('sequelize');
const db = require('../db/db')

class User extends Model{}

User.init({

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize: db,
    modelName: "User"
})
module.exports = User;