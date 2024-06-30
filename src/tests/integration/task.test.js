const { describe, expect, it, beforeAll, afterAll, beforeEach } = require('@jest/globals');
const connection = require('../../config/database')
const projectController = require('../../controllers/project')
const userController = require('../../controllers/user')
const taskController = require('../../controllers/task')

describe('Integration Test - Task CRUD Operations', () => {
    let transaction
    const updatedTask = { title: "Task Name Updated", description: "Updated task description" };

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

    it('Must add a task to the database', async () => {
        const mockUser = { name: "User Test", email: "usertest@domain.test", password: "usertestpassword2024" };
        const newUser = await userController.create(mockUser.name, mockUser.email, mockUser.password, transaction)

        const mockProject = { name: "project Test", description: "projecttest@domain.test", userId: newUser.dataValues.id };

        const newProject = await projectController.create(mockProject.name, mockProject.description, mockProject.userId, transaction)
        const mockTask = {
            title: "New Task",
            description: "New Task description",
            projectId: newProject.dataValues.id
        }

        const task = await taskController.create(mockTask.title, mockTask.description, mockTask.projectId, transaction)

        expect(mockTask.title).toBe(task.dataValues.title);
        expect(mockTask.description).toBe(task.dataValues.description);
        expect(mockTask.projectId).toBe(task.dataValues.projectId);
    })

    it('Must update a task to the database', async () => {
        const mockUser = { name: "User Test", email: "usertest@domain.test", password: "usertestpassword2024" };
        const newUser = await userController.create(mockUser.name, mockUser.email, mockUser.password, transaction)

        const mockProject = { name: "project Test", description: "projecttest@domain.test", userId: newUser.dataValues.id };

        const newProject = await projectController.create(mockProject.name, mockProject.description, mockProject.userId, transaction)
        const mockTask = {
            title: "New Task",
            description: "New Task description",
            projectId: newProject.dataValues.id
        }
        const newTask = await taskController.create(mockTask.title, mockTask.description, mockTask.projectId, transaction)

        const task = await taskController.update(newTask.dataValues.id, updatedTask.title, updatedTask.description)
        expect(updatedTask.title).toBe(task.dataValues.title);
        expect(updatedTask.description).toBe(task.dataValues.description);
        expect(newTask.dataValues.projectId).toBe(task.dataValues.projectId);
    })

    it('Must delete a task to the database', async () => {
        const mockUser = { name: "User Test", email: "usertest@domain.test", password: "usertestpassword2024" };
        const newUser = await userController.create(mockUser.name, mockUser.email, mockUser.password, transaction)

        const mockProject = { name: "project Test", description: "projecttest@domain.test", userId: newUser.dataValues.id };

        const newProject = await projectController.create(mockProject.name, mockProject.description, mockProject.userId, transaction)
        const mockTask = {
            title: "New Task",
            description: "New Task description",
            projectId: newProject.dataValues.id
        }
        const newTask = await taskController.create(mockTask.title, mockTask.description, mockTask.projectId, transaction)

        const task = await taskController.delete(newTask.dataValues.id)
        expect(task).toBe(1);
    })

    it('Must get all tasks to the database', async () => {
        const mockUser = { name: "User Test", email: "usertest@domain.test", password: "usertestpassword2024" };
        const newUser = await userController.create(mockUser.name, mockUser.email, mockUser.password, transaction)

        const mockProject = { name: "project Test", description: "projecttest@domain.test", userId: newUser.dataValues.id };
        const newProject = await projectController.create(mockProject.name, mockProject.description, mockProject.userId, transaction)

        const databaseLenght = await Number((await taskController.find()).length)
        const task = await Number((await taskController.find()).length)

        expect(task).toBe(databaseLenght);
    })

    // it('Must update a project to the database', async () => {
    //     const mockUser = { name: "User Test", email: "usertest@domain.test", password: "usertestpassword2024" };
    //     const newUser = await userController.create(mockUser.name, mockUser.email, mockUser.password, transaction)

    //     const mockProject = { name: "project Test", description: "projecttest@domain.test", userId: newUser.dataValues.id };
    //     const newProject = await projectController.create(mockProject.name, mockProject.description, mockProject.userId, transaction)

    //     const project = await projectController.update(newProject.dataValues.id, updatedTask.name, updatedTask.description)


    //     expect(project.dataValues.name).toBe(updatedTask.name);
    //     expect(project.dataValues.description).toBe(updatedTask.description);
    //     expect(project.dataValues.userId).toBe(newProject.dataValues.userId);
    // })

    // it('Must delete a user to the database', async () => {
    //     const mockUser = { name: "User Test", email: "usertest@domain.test", password: "usertestpassword2024" };
    //     const newUser = await userController.create(mockUser.name, mockUser.email, mockUser.password, transaction)

    //     const lenghtBefore = await Number((await projectController.find()).length)

    //     const mockProject = { name: "project Test", description: "projecttest@domain.test", userId: newUser.dataValues.id };
    //     const newProject = await projectController.create(mockProject.name, mockProject.description, mockProject.userId, transaction)

    //     const project = await projectController.delete(newProject.dataValues.id, transaction)

    //     const lenghtAfter = await Number((await projectController.find()).length)

    //     expect(project).toBe(1);
    //     //expect(lenghtAfter + 1).toBe(lenghtBefore);
    // })

    // it('Must received all users from database', async () => {
    //     const mockUser = { name: "User Test", email: "usertest@domain.test", password: "usertestpassword2024" };
    //     const newUser = await userController.create(mockUser.name, mockUser.email, mockUser.password, transaction)

    //     const mockProject = { name: "project Test", description: "projecttest@domain.test", userId: newUser.dataValues.id };
    //     const newProject = await projectController.create(mockProject.name, mockProject.description, mockProject.userId, transaction)

    //     const databaseLenght = await Number((await projectController.find()).length)
    //     const project = await Number((await projectController.find()).length)
    //     console.log(databaseLenght, project)

    //     expect(project).toBe(databaseLenght);
    // })
})