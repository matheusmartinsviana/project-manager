const app = require('./app')
const database = require('./config/database')
const UserApi = require('./api/user')
const UserRouter = require('./routes/user')
const ProjectRouter = require('./routes/project')

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World' })
})

app.post('/api/v1/login', UserApi.login)
app.post('/api/v1/user', UserApi.createUser)

// routes with token
app.use(UserApi.validateToken)
app.use('/api/v1/user', UserRouter)
app.use('/api/v1/project', ProjectRouter)

database.db.sync({ force: false })
    .then(_ => {
        app.listen(8000, _ => {
            console.log('Server running on port 8000')
        })
    })
    .catch(e => {
        console.error(`Error initializing database: ${e}`)
    })