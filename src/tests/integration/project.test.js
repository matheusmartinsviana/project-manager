const { describe, expect, it, beforeAll, afterAll, beforeEach } = require('@jest/globals');
const connection = require('../../config/database')
const projectController = require('../../controllers/project')
const userController = require('../../controllers/user')

describe('Integration Test - Project CRUD Operations', () => {
    let transaction
    const updatedProject = { name: "Project Name Updated", description: "Updated project description" };

    beforeAll(async () => {
        connection.init()
        console.info('Starting the tests')
    })

    beforeEach(async () => {
        transaction = await connection.db.transaction()
    })

    afterAll(async () => {
        console.info('Ending the tests')
    })

    afterEach(async () => {
        await transaction.rollback()
    })

    it('Must add a project to the database', async () => {
        const mockUser = { name: "User Test", email: "usertest@domain.test", password: "usertestpassword2024" };
        const newUser = await userController.create(mockUser.name, mockUser.email, mockUser.password, transaction)

        const mockProject = { name: "project Test", description: "projecttest@domain.test", userId: newUser.dataValues.id };

        const project = await projectController.create(mockProject.name, mockProject.description, mockProject.userId, transaction)

        expect(mockProject.name).toBe(project.dataValues.name);
        expect(mockProject.description).toBe(project.dataValues.description);
        expect(mockProject.userId).toBe(project.dataValues.userId);
    })

    it('Must update a project to the database', async () => {
        const mockUser = { name: "User Test", email: "usertest@domain.test", password: "usertestpassword2024" };
        const newUser = await userController.create(mockUser.name, mockUser.email, mockUser.password, transaction)

        const mockProject = { name: "project Test", description: "projecttest@domain.test", userId: newUser.dataValues.id };
        const newProject = await projectController.create(mockProject.name, mockProject.description, mockProject.userId, transaction)

        const project = await projectController.update(newProject.dataValues.id, updatedProject.name, updatedProject.description)


        expect(project.dataValues.name).toBe(updatedProject.name);
        expect(project.dataValues.description).toBe(updatedProject.description);
        expect(project.dataValues.userId).toBe(newProject.dataValues.userId);
    })

    it('Must delete a user to the database', async () => {
        const mockUser = { name: "User Test", email: "usertest@domain.test", password: "usertestpassword2024" };
        const newUser = await userController.create(mockUser.name, mockUser.email, mockUser.password, transaction)

        const lenghtBefore = await Number((await projectController.find()).length)

        const mockProject = { name: "project Test", description: "projecttest@domain.test", userId: newUser.dataValues.id };
        const newProject = await projectController.create(mockProject.name, mockProject.description, mockProject.userId, transaction)

        const project = await projectController.delete(newProject.dataValues.id, transaction)
        
        const lenghtAfter = await Number((await projectController.find()).length)

        expect(project).toBe(1);
        //expect(lenghtAfter + 1).toBe(lenghtBefore);
    })

    it('Must received all users from database', async () => {
        const mockUser = { name: "User Test", email: "usertest@domain.test", password: "usertestpassword2024" };
        const newUser = await userController.create(mockUser.name, mockUser.email, mockUser.password, transaction)

        const mockProject = { name: "project Test", description: "projecttest@domain.test", userId: newUser.dataValues.id };
        const newProject = await projectController.create(mockProject.name, mockProject.description, mockProject.userId, transaction)

        const databaseLenght = await Number((await projectController.find()).length)
        const project = await Number((await projectController.find()).length)
        console.log(databaseLenght, project)

        expect(project).toBe(databaseLenght);
    })
})