const express = require('express');
const AuthMiddleware = require('../middlewares/authMiddleware')
const ProjectApi = require('../api/project');

const router = express.Router();

router.post('/', AuthMiddleware.validateToken, ProjectApi.createProject)
router.put('/:id', AuthMiddleware.validateToken, ProjectApi.updateProject)
router.get('/', AuthMiddleware.validateToken, ProjectApi.findProjects)
router.delete('/:id', AuthMiddleware.validateToken, ProjectApi.deleteProject)

module.exports = router;