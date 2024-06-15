const { DataTypes } = require('sequelize')
const database = require('../config/database')

class User {
    constructor() {
        this.model = database.db.define('users', {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: database.db.Sequelize.STRING
            },
            email: {
                type: database.db.Sequelize.STRING
            },
            password: {
                type: database.db.Sequelize.STRING
            },
            createdAt: {
                type: DataTypes.DATE
            }
        })
    }
}

module.exports = (new User()).model