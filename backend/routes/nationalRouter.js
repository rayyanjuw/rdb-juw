const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/auth');
const {
    createNationalInternationalGrant,
    getAllNationalInternationalGrants,
    updateNationalInternationalGrant,
    deleteNationalInternationalGrant, upload
} = require('../contollers/nationalInternationalController');

// Route to create a new grant
router.post('/create',authenticate ,upload.single('projectDescription'), createNationalInternationalGrant);

// Route to get all grants
router.get('/getAll',authenticate, getAllNationalInternationalGrants);

// Route to update a specific grant
router.put('/update/:id',authenticate ,upload.single('projectDescription'), updateNationalInternationalGrant);

// Route to delete a specific grant
router.delete('/delete/:id',authenticate, deleteNationalInternationalGrant);

module.exports = router;
