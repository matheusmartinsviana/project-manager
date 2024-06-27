const request = require('supertest');
const startServer = require('../../server');
const database = require('../../config/database');

const mockUser = {
    name: "User",
    email: "user@domain.com",
    password: "password"
};
const mockUserUpdated = {
    name: "User Updated",
    email: "userUpdated@domain.com",
    password: "password updated"
};

let server;

beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    server = await startServer();
});

afterAll(async () => {
    if (server) {
        await server.close();
    }
    await database.db.close();
});

describe('API Tests - User Endpoints', () => {
    it('post at /api/v1/user to create a new user', async () => {
        const response = await request(server)
            .post('/api/v1/user/')
            .send(mockUser);

        expect(response.statusCode).toBe(201);
        expect(response.body.name).toEqual(mockUser.name);
        expect(response.body.email).toEqual(mockUser.email);
    });

    it('put at /api/v1/user/:id to update a user', async () => {
        const userValue = await request(server)
            .post('/api/v1/user/')
            .send(mockUser);

        const login = await request(server)
            .post('/api/v1/user/login')
            .send({ email: mockUser.email, password: mockUser.password });

        const response = await request(server)
            .put(`/api/v1/user/${userValue.body.id}`)
            .set("Authorization", login.body.token)
            .send(mockUserUpdated);

        expect(response.statusCode).toBe(200);
        expect(response.body.name).toEqual(mockUserUpdated.name);
        expect(response.body.email).toEqual(mockUserUpdated.email);
    });
});