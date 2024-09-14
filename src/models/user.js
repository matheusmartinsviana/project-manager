const { DataTypes } = require('sequelize');
const database = require('../config/database');

class User {
    constructor() {
        this.model = database.db.define('users', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING
            },
            createdAt: {
                type: DataTypes.DATE
            }
        });
    }
}

module.exports = (new User()).model;
