const { DataTypes } = require('sequelize');
const database = require('../config/database');

class Task {
    constructor() {
        this.model = database.db.define('tasks', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
            },
            status: {
                type: DataTypes.STRING,
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
                type: DataTypes.INTEGER,
                references: {
                    model: 'projects',
                    key: 'id'
                }
            }
        });
    }
}

module.exports = (new Task()).model;
