const express = require('express');
const router = express.Router();
const fundedProjectController = require('../contollers/FundedProjectModel');

// Define routes for Funded & In Progress Projects
router.get('/', fundedProjectController.getAllProjects);
router.get('/:id', fundedProjectController.getProjectById);
router.post('/', fundedProjectController.createProject);
router.put('/:id', fundedProjectController.updateProject);
router.delete('/:id', fundedProjectController.deleteProject);

module.exports = router;
