const { DataTypes } = require('sequelize')
const database = require('../config/database')

class Project {
    constructor() {
        this.model = database.db.define('projects', {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            description: {
                type: database.db.Sequelize.STRING,
                allowNull: false
            },
            createdAt: {
                type: DataTypes.DATE
            },
            userId: {
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'id'
                }
            }
        })
    }
}

module.exports = (new Project()).model