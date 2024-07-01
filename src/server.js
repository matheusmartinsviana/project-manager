const app = require('./app')
const database = require('./config/database')
const UserRouter = require('./routes/user')
const ProjectRouter = require('./routes/project')
const TaskRouter = require('./routes/task')

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World' })
})

app.use('/api/v1/user', UserRouter)
app.use('/api/v1/project', ProjectRouter)
app.use('/api/v1/task', TaskRouter)

database.db.sync({ force: false })
    .then(_ => {
        app.listen(8000, _ => {
            console.log('Server running on port 8000')
        })
    })
    .catch(e => {
        console.error(`Error initializing database: ${e}`)
    })