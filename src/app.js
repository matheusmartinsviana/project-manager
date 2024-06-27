const express = require('express')
const cors = require('cors')
const UserRouter = require('./routes/user')
const ProjectRouter = require('./routes/project')
const TaskRouter = require('./routes/task')

const app = express()
app.use(express.json());
app.use(cors());
app.use('/api/v1/user', UserRouter)
app.use('/api/v1/project', ProjectRouter)
app.use('/api/v1/task', TaskRouter)

module.exports = app