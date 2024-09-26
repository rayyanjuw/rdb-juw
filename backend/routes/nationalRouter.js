const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/auth');
const {
    createNationalInternationalGrant,
    getAllNationalInternationalGrants,
    updateNationalInternationalGrant,
    deleteNationalInternationalGrant, upload,
    getAllNationalInternationalGrantsById, serveFile
} = require('../contollers/nationalInternationalController');

// Route to create a new grant
router.post('/create',authenticate ,upload, createNationalInternationalGrant);

// Route to get all grants
router.get('/getAll',authenticate, getAllNationalInternationalGrants);

router.get('/getBy/:id',authenticate, getAllNationalInternationalGrantsById);

// Route to update a specific grant
router.put('/update/:id',authenticate ,upload, updateNationalInternationalGrant);

// Route to delete a specific grant
router.delete('/delete/:id',authenticate, deleteNationalInternationalGrant);

// Serve the file from the uploads directory
router.get('/uploads/:filename', serveFile);

module.exports = router;
