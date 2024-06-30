const { describe, expect, it, beforeAll, afterAll, beforeEach } = require('@jest/globals');
const connection = require('../../config/database')
const userController = require('../../controllers/user')

describe('Integration Test - User CRUD Operations', () => {
    let transaction
    const mockUser = { name: "User Test", email: "usertest@domain.test", password: "usertestpassword2024" };
    const mockUpdatedUser = { name: "User Test Updated", email: "usertestupdated@domain.test", password: "usertestupdatedpassword2024" };

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

        expect(mockUser.name).toBe(user.dataValues.name);
        expect(mockUser.email).toBe(user.dataValues.email);
    })

    it('Must update a user to the database', async () => {
        const newUser = await userController.create(mockUser.name, mockUser.email, mockUser.password, transaction)
        const user = await userController.update([newUser.dataValues.id], mockUpdatedUser.name, mockUpdatedUser.email, mockUpdatedUser.password, transaction)

        expect(mockUpdatedUser.name).toBe(user.dataValues.name);
        expect(mockUpdatedUser.email).toBe(user.dataValues.email);
    })

    it('Must delete a user to the database', async () => {
        const newUser = await userController.create(mockUser.name, mockUser.email, mockUser.password, transaction)
        const lenghtBefore = await Number((await userController.find()).length)
        const user = await userController.delete([newUser.dataValues.id], transaction)
        const lenghtAfter = await Number((await userController.find()).length)

        expect(user).toBe(1);
        //expect(lenghtAfter + 1).toBe(lenghtBefore);
    })

    it('Must received all users from database', async () => {
        const newUser = await userController.create(mockUser.name, mockUser.email, mockUser.password, transaction)
        const databaseLenght = await Number((await userController.find()).length)
        const user = await Number((await userController.find([newUser.dataValues.id], transaction)).length)

        expect(user).toBe(databaseLenght);
    })
})