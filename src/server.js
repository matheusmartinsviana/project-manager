const app = require('./app');
const database = require('./config/database');
const UserRouter = require('./routes/user');
const ProjectRouter = require('./routes/project');
const TaskRouter = require('./routes/task');

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World' });
});

app.use('/api/v1/user', UserRouter);
app.use('/api/v1/project', ProjectRouter);
app.use('/api/v1/task', TaskRouter);

const port = process.env.PORT || 8000;

database.db.sync({ force: false })
    .then(_ => {
        app.listen(port, _ => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch(e => {
        console.error(`Error initializing database: ${e}`);
    });
