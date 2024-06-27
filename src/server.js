const app = require('./app');
const database = require('./config/database');

const PORT = 8000;

const startServer = async () => {
    try {
        await database.db.sync({ force: false });
        const server = app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
        return server;
    } catch (e) {
        console.error(`Error initializing database: ${e}`);
        throw e;
    }
};

if (process.env.NODE_ENV !== 'test') {
    startServer();
}

module.exports = startServer;