const express = require('express');
const router = express.Router();
const completedProjectController = require('../contollers/CompleteProjectControllers');
const authenticate = require("../middlewares/auth")

// Define routes for Completed Research Projects
router.get('/getAll',authenticate, completedProjectController.getAllProjects);
router.get('/:id',authenticate, completedProjectController.getProjectById);
router.post('/create',authenticate, completedProjectController.createProject);
router.put('/:id',authenticate, completedProjectController.updateProject);
router.delete('/:id',authenticate, completedProjectController.deleteProject);

module.exports = router;
