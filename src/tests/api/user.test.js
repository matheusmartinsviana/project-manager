const { describe, expect, it } = require('@jest/globals');
const request = require('supertest')
const app = require('../../server')

const mockUser = {
    name: "User",
    email: "user@domain.com",
    password: "password"
}
const mockUserUpdated = {
    name: "User Updated",
    email: "userUpdated@domain.com",
    password: "password updated"
}

describe('API Tests - User Endpoints', () => {

    it('post at /api/v1/user to create a new user', async () => {
        const response = await request(app)
            .post('/api/v1/user/')
            .send(mockUser)

        expect(response.statusCode).toBe(201)
        expect(response.body.name).toEqual(mockUser.name)
        expect(response.body.email).toEqual(mockUser.email)
    })

    it('put at /api/v1/user/:id to update a user', async () => {
        const userValue = await request(app)
            .post('/api/v1/user/')
            .send(mockUser)

        const login = await request(app)
            .post('/api/v1/user/login')
            .send({ email: mockUser.email, password: mockUser.password })

        const response = await request(app)
            .put(`/api/v1/user/${userValue.body.id}`)
            .set("Authorization", login.body.token)
            .send(mockUserUpdated)

        expect(response.statusCode).toBe(200)
        expect(response.body.name).toEqual(mockUserUpdated.name)
        expect(response.body.email).toEqual(mockUserUpdated.email)
    })
})