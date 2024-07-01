const express = require('express')
const AuthMiddleware = require('../middlewares/authMiddleware')
const TaskApi = require('../api/task')

const router = express.Router()

router.get('/', AuthMiddleware.validateToken, TaskApi.findTasks)
router.get('/status', AuthMiddleware.validateToken, TaskApi.findTasksByStatus)
router.post('/', AuthMiddleware.validateToken, TaskApi.createTask)
router.put('/:id', AuthMiddleware.validateToken, TaskApi.updateTask)
router.delete('/:id', AuthMiddleware.validateToken, TaskApi.deleteTask)

module.exports = router;