const express = require('express');
const router = express.Router();
const {createOricFunded, getAllOricFundedProjects, 
    updateOricFundedProject, 
    deleteOricFundedProject } = require('../contollers/ORICFundedProjectController');

const authorize = require('../middlewares/authorize');
const authenticate = require('../middlewares/auth');


router.post('/create', authenticate, createOricFunded);
router.get('/getAll', authenticate, getAllOricFundedProjects);
router.put('/update/:id', authenticate, updateOricFundedProject);
router.delete('/delete/:id', authenticate, deleteOricFundedProject);

module.exports = router;