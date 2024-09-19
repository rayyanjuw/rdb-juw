const express = require('express');
const router = express.Router();
const {createOricFunded, getAllOricFundedProjects, 
    updateOricFundedProject, 
    deleteOricFundedProject, approveOrRejectProject,
    getAllResearchProjects } = require('../contollers/ORICFundedProjectController');

const authorize = require('../middlewares/authorize');
const authenticate = require('../middlewares/auth');


router.post('/create', authenticate, createOricFunded);
router.get('/getAll', authenticate, getAllOricFundedProjects);
router.put('/update/:id', authenticate, updateOricFundedProject);
router.delete('/delete/:id', authenticate, deleteOricFundedProject);


// approved request
router.post('/approval-requests/:id',authenticate, approveOrRejectProject )
router.get('/approval-requests',authenticate, getAllResearchProjects )

module.exports = router;