const project = require('../models/project')
const UserController = require('./user')

class ProjectController {
    async create(name, description, userId) {
        if (!name || !description || !userId) {
            throw new Error('Name, description, and userId are required')
        }

        await UserController.findUser(Number(userId))

        const projectValue = await project.create({
            name,
            description,
            userId
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

    async update(id, name, description, userId) {
        if (!id || !name || !description || !userId) {
            throw new Error('Id, name, description, and userId are required')
        }

        await UserController.findUser(userId)

        const projectValue = await this.findProject(id)

        projectValue.name = name
        projectValue.description = description
        projectValue.userId = userId
        await projectValue.save()

        return projectValue
    }

    async delete(id) {
        if (!id) {
            throw new Error('Id is required')
        }
        const projectValue = await this.findProject(id)
        await projectValue.destroy()

        return
    }

    async find() {
        return project.findAll()
    }
}

module.exports = new ProjectController()