const express = require('express');
const { createHonors, getHonors, deleteHonors, updateHonors } = require('../contollers/honorsControllers');
const authenticate = require('../middlewares/auth')

const router = express.Router();

router.post('/create',authenticate, createHonors);
router.get('/gethonors',authenticate, getHonors);
router.put('/update',authenticate, updateHonors);
router.delete('/delete',authenticate, deleteHonors);



module.exports = router;