const task = require('../models/task')
const ProjectController = require('../controllers/project')

class TaskController {
    async create(title, description, projectId) {
        if (title === undefined || description === undefined || projectId === undefined) {
            throw new Error('Title, description and projectId are required')
        }

        await ProjectController.findProject(Number(projectId))

        const taskValue = await task.create({
            title,
            description,
            projectId
        })

        return taskValue
    }

    async update(id, title, description, status, conclusionDate, projectId) {
        if (id === undefined || title === undefined || description === undefined || projectId === undefined) {
            throw new Error('Id, title, description, projectId are required')
        }

        await ProjectController.findProject(projectId)

        const taskValue = await this.findTask(id)

        taskValue.title = title
        taskValue.description = description
        taskValue.projectId = projectId
        taskValue.status = status
        taskValue.conclusionDate = conclusionDate
        taskValue.save()

        return taskValue
    }

    async delete(id) {
        if (id === undefined) {
            throw new Error('Id is required')
        }
        const taskValue = await this.findTask(id)
        taskValue.destroy()
        return
    }

    async findTask(id) {
        if (id === undefined) {
            throw new Error('Id is required')
        }

        const taskValue = await task.findByPk(id)

        if (!taskValue) {
            throw new Error('Task not found')
        }

        return taskValue
    }

    async find() {
        return task.findAll()
    }
}

module.exports = new TaskController()