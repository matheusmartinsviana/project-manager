const { DataTypes } = require('sequelize')
const database = require('../config/database')

class Task {
    constructor() {
        this.model = database.db.define('tasks', {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            description: {
                type: database.db.Sequelize.STRING,
            },
            status: {
                type: database.db.Sequelize.STRING,
                defaultValue: "pending"
            },
            conclusionDate: {
                type: DataTypes.DATE,
                allowNull: true
            },
            createdAt: {
                type: DataTypes.DATE
            },
            projectId: {
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: 'projects',
                    key: 'id'
                }
            }
        })

    }
}