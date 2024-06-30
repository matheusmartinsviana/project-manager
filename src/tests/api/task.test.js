const { describe, expect, it } = require('@jest/globals');
const request = require('supertest')
const app = require('../../server')

const mockUser = {
    name: "User",
    email: "user@domain.com",
    password: "password"
}

const mockUpdatedTask = {
    title: "Updated Task",
    description: "Updated Task Description",
    status: "pending",
    conclusionDate: null
}

describe('API Tests - Task Endpoints', () => {

    it('post at /api/v1/task to create a new task', async () => {
        const newUser = await request(app)
            .post('/api/v1/user')
            .send(mockUser)

        const login = await request(app)
            .post('/api/v1/user/login')
            .send({ email: mockUser.email, password: mockUser.password })

        const mockProject = {
            name: "User Updated",
            description: "userUpdated@domain.com",
            userId: newUser.body.id
        }

        const newProject = await request(app)
            .post('/api/v1/project')
            .set("Authorization", login.body.token)
            .send(mockProject)

        const mockTask = {
            title: "Title task",
            description: "task description",
            projectId: newProject.body.id
        }

        console.log(mockTask)

        const response = await request(app)
            .post('/api/v1/task')
            .set("Authorization", login.body.token)
            .send(mockTask)

        expect(response.statusCode).toBe(201)
        expect(response.body.title).toEqual(mockTask.title)
        expect(response.body.description).toEqual(mockTask.description)
    })

    it('put at /api/v1/task to update a new task', async () => {
        const newUser = await request(app)
            .post('/api/v1/user')
            .send(mockUser)

        const login = await request(app)
            .post('/api/v1/user/login')
            .send({ email: mockUser.email, password: mockUser.password })

        const mockProject = {
            name: "User Updated",
            description: "userUpdated@domain.com",
            userId: newUser.body.id
        }

        const newProject = await request(app)
            .post('/api/v1/project')
            .set("Authorization", login.body.token)
            .send(mockProject)

        const mockTask = {
            title: "Title task",
            description: "task description",
            projectId: newProject.body.id
        }

        const newTask = await request(app)
            .post('/api/v1/task')
            .set("Authorization", login.body.token)
            .send(mockTask)
        const taskId = await Number(newTask.body.id)

        const response = await request(app)
            .put(`/api/v1/task/${taskId}`)
            .set("Authorization", login.body.token)
            .send(mockUpdatedTask)

        expect(response.statusCode).toBe(200)
        expect(response.body.title).toEqual(mockUpdatedTask.title)
        expect(response.body.description).toEqual(mockUpdatedTask.description)
        expect(response.body.projectId).toEqual(newProject.body.id)
    })
    
    it('delete at /api/v1/task to delete a task', async () => {
        const newUser = await request(app)
            .post('/api/v1/user')
            .send(mockUser)

        const login = await request(app)
            .post('/api/v1/user/login')
            .send({ email: mockUser.email, password: mockUser.password })

        const mockProject = {
            name: "User Updated",
            description: "userUpdated@domain.com",
            userId: newUser.body.id
        }

        const newProject = await request(app)
            .post('/api/v1/project')
            .set("Authorization", login.body.token)
            .send(mockProject)

        const mockTask = {
            title: "Title task",
            description: "task description",
            projectId: newProject.body.id
        }

        const newTask = await request(app)
            .post('/api/v1/task')
            .set("Authorization", login.body.token)
            .send(mockTask)
        const taskId = await Number(newTask.body.id)

        const response = await request(app)
            .delete(`/api/v1/task/${taskId}`)
            .set("Authorization", login.body.token)
            .send()

        expect(response.statusCode).toBe(204)
    })
    
    it('get at /api/v1/task to get all tasks', async () => {
        const newUser = await request(app)
            .post('/api/v1/user')
            .send(mockUser)

        const login = await request(app)
            .post('/api/v1/user/login')
            .send({ email: mockUser.email, password: mockUser.password })

        const mockProject = {
            name: "User Updated",
            description: "userUpdated@domain.com",
            userId: newUser.body.id
        }

        const newProject = await request(app)
            .post('/api/v1/project')
            .set("Authorization", login.body.token)
            .send(mockProject)

        const mockTask = {
            title: "Title task",
            description: "task description",
            projectId: newProject.body.id
        }

        const newTask = await request(app)
            .post('/api/v1/task')
            .set("Authorization", login.body.token)
            .send(mockTask)
        const taskId = await Number(newTask.body.id)

        const response = await request(app)
            .delete(`/api/v1/task/${taskId}`)
            .set("Authorization", login.body.token)
            .send()

        expect(response.statusCode).toBe(204)
    })

})