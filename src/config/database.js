const { Sequelize } = require('sequelize')

class Database {
    constructor() {
        this.init()
    }

    init() {
        this.db = new Sequelize({
            database: 'project-manager',
            host: 'localhost',
            username: 'root',
            dialect: 'mysql'
        })
    }
}

module.exports = new Database()