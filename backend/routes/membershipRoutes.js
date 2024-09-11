const express = require('express');
const { createMembership, getMemberships, updateMembership } = require('../contollers/membershipController');

const authenticate = require('../middlewares/auth');

const router = express.Router();

router.post('/create', authenticate, createMembership);
router.get('/get',authenticate, getMemberships);
router.put('/update',authenticate, updateMembership);


module.exports = router;