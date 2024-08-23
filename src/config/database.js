const { Sequelize } = require('sequelize');

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.db = new Sequelize('project-manager', 'username', 'password', {
            host: 'host',
            dialect: 'postgres',
            port: 5432,  // Verifique a porta correta
            logging: false // Ative o logging se precisar ver os logs das consultas SQL
        });
    }
}

module.exports = new Database();