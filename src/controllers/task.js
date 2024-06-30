const task = require('../models/task')
const ProjectController = require('../controllers/project')

class TaskController {
    async create(title, description, projectId, transaction) {
        if (!title || !description || !projectId) {
            throw new Error('Title, description, and projectId are required')
        }

        await ProjectController.findProject(Number(projectId))

        const taskValue = await task.create({
            title,
            description,
            projectId,
            transaction
        })

        return taskValue
    }

    async update(id, title, description, status, conclusionDate, transaction) {
        if (!id || !title || !description) {
            throw new Error('Id, title, and description are required')
        }

        const taskValue = await this.findTask(id)

        taskValue.title = title
        taskValue.description = description
        if (status !== undefined) taskValue.status = status
        if (conclusionDate !== undefined) taskValue.conclusionDate = conclusionDate

        await taskValue.save(transaction)
        return taskValue
    }

    async delete(id, transaction) {
        if (!id) {
            throw new Error('Id is required')
        }

        const taskValue = await this.findTask(id)
        if (await taskValue.destroy(transaction)) return 1
    }

    async findTask(id) {
        if (!id) {
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

    async findByStatus(status, transaction) {
        if (!status) {
            throw new Error('Status is required')
        }

        const taskValue = await task.findAndCountAll({
            where: { status: status }, transaction
        })

        return taskValue
    }
}

module.exports = new TaskController()