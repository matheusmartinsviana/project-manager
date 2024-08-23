const { Sequelize } = require('sequelize');

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.db = new Sequelize('projectmanager_57z8', 'root', 'pl29pa1okBQqKLPwsJz93K8upYXV0LXN', {
            host: 'dpg-cr40hcjtq21c73drsil0-a.oregon-postgres.render.com',
            dialect: 'postgres',
            port: 5432,
            logging: false, // Ative o logging se precisar ver os logs das consultas SQL
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false // Ajuste conforme necessário
                }
            }
        });
    }
}

module.exports = new Database();
