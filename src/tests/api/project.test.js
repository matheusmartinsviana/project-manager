const { describe, expect, it } = require('@jest/globals');
const request = require('supertest')
const app = require('../../server')

const mockUser = {
    name: "User",
    email: "user@domain.com",
    password: "password"
}

const mockUpdatedProject = {
    name: "Updated Project",
    description: "Updated Project Description",
}

describe('API Tests - Project Endpoints', () => {

    it('post at /api/v1/project to create a new project', async () => {
        const newUser = await request(app)
            .post('/api/v1/user/')
            .send(mockUser)

        const login = await request(app)
            .post('/api/v1/user/login')
            .send({ email: mockUser.email, password: mockUser.password })

        const mockProject = {
            name: "User Updated",
            description: "userUpdated@domain.com",
            userId: newUser.body.id
        }

        const response = await request(app)
            .post('/api/v1/project/')
            .set("Authorization", login.body.token)
            .send(mockProject)

        expect(response.statusCode).toBe(201)
        expect(response.body.name).toEqual(mockProject.name)
        expect(response.body.description).toEqual(mockProject.description)
    })

    it('put at /api/v1/project to update a project', async () => {
        const newUser = await request(app)
            .post('/api/v1/user/')
            .send(mockUser)

        const login = await request(app)
            .post('/api/v1/user/login')
            .send({ email: mockUser.email, password: mockUser.password })

        const mockProject = {
            name: "Project",
            description: "Project Description",
            userId: newUser.body.id
        }

        const newProject = await request(app)
            .post('/api/v1/project/')
            .set("Authorization", login.body.token)
            .send(mockProject)

        const response = await request(app)
            .put(`/api/v1/project/${newProject.body.id}`)
            .set("Authorization", login.body.token)
            .send(mockUpdatedProject)

        expect(response.statusCode).toBe(200)
        expect(response.body.name).toEqual(mockUpdatedProject.name)
        expect(response.body.description).toEqual(mockUpdatedProject.description)
    })
    
    it('delete at /api/v1/project to delete a project', async () => {
        const newUser = await request(app)
            .post('/api/v1/user/')
            .send(mockUser)

        const login = await request(app)
            .post('/api/v1/user/login')
            .send({ email: mockUser.email, password: mockUser.password })

        const mockProject = {
            name: "Project",
            description: "Project Description",
            userId: newUser.body.id
        }

        const newProject = await request(app)
            .post('/api/v1/project/')
            .set("Authorization", login.body.token)
            .send(mockProject)

        const response = await request(app)
            .delete(`/api/v1/project/${newProject.body.id}`)
            .set("Authorization", login.body.token)
            .send()

        expect(response.statusCode).toBe(204)
    })

    it('get at /api/v1/project to get all projects', async () => {
        const newUser = await request(app)
            .post('/api/v1/user/')
            .send(mockUser)

        const login = await request(app)
            .post('/api/v1/user/login')
            .send({ email: mockUser.email, password: mockUser.password })

        const mockProject = {
            name: "Project",
            description: "Project Description",
            userId: newUser.body.id
        }

        const newProject = await request(app)
            .post('/api/v1/project/')
            .set("Authorization", login.body.token)
            .send(mockProject)

        const response = await request(app)
            .get(`/api/v1/project/`)
            .set("Authorization", login.body.token)
            .send()

        expect(response.statusCode).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
    })
})