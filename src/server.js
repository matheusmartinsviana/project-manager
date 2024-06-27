const { config } = require('dotenv')
const app = require('./app')
const database = require('./config/database')

const PORT = 8000
database.db.sync({ force: false })
    .then(_ => {
        if (process.env.NODE_ENV !== 'test') {
            app.listen(PORT, () => {
                console.log(`Server is running at port: ${PORT}`);
            });
        }
    })
    .catch(e => {
        console.error(`Error initializing database: ${e}`)
    })

module.exports = app