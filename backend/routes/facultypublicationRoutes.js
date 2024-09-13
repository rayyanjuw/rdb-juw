const express = require('express');
const authenticate = require('../middlewares/auth');
const authorize = require('../middlewares/authorize');

const { createFacultyPublication, getAllPublications, getPublicationById, updatePublication, DeletePublication } = require('../contollers/facultypublicationControllers');

const router = express.Router();

router.post('/create', authenticate, createFacultyPublication);
router.get('/getAll',authenticate, getAllPublications);
router.get('/getBy/:id',authenticate, getPublicationById);
router.put('/update/:id',authenticate, updatePublication);
router.delete('/delete/:id', authenticate, DeletePublication)




module.exports = router