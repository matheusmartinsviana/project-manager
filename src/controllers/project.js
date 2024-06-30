const project = require('../models/project')
const UserController = require('./user')

class ProjectController {
    async create(name, description, userId, transaction) {
        if (!name || !description || !userId) {
            throw new Error('Name, description, and userId are required')
        }

        await UserController.findUser(Number(userId))

        const projectValue = await project.create({
            name,
            description,
            userId,
            transaction
        })

        return projectValue
    }

    async findProject(id) {
        if (!id) {
            throw new Error('Id is required')
        }

        const projectValue = await project.findByPk(id)

        if (!projectValue) {
            throw new Error('Project not found')
        }

        return projectValue
    }

    async update(id, name, description, transaction) {
        if (!id || !name || !description) {
            throw new Error('Id, name and description are required')
        }

        const projectValue = await this.findProject(id)
        await UserController.findUser(projectValue.userId)

        projectValue.name = name
        projectValue.description = description

        await projectValue.save(transaction)

        return projectValue
    }

    async delete(id, transaction) {
        if (!id) {
            throw new Error('Id is required')
        }
        const projectValue = await this.findProject(id)
        if (await projectValue.destroy(transaction)) return 1
    }

    async find() {
        return project.findAll()
    }
}

module.exports = new ProjectController()