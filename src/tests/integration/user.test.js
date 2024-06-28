const { describe, expect, it, beforeAll, afterAll, beforeEach } = require('@jest/globals');
const connection = require('../../config/database')
const userController = require('../../controllers/user')

describe('Integration Test - User CRUD Operations', () => {
    let transaction
    const mockUser = { name: "User Test", email: "usertest@domain.test", password: "usertestpassword2024" };

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

    it('Must add a user to the database', async () => {
        const user = await userController.create(mockUser.name, mockUser.email, mockUser.password, transaction)

        console.log(user[user.dataValues.id])
        expect(mockUser.name).toBe(user.dataValues.name);
        expect(mockUser.email).toBe(user.dataValues.email);
    })

})