const express = require("express")

const authenticate = require('../middlewares/auth')

const { createDepartment, getAllDepartmentNames } = require("../contollers/DepartmentControllers");

const router = express.Router();

router.post('/create', authenticate, createDepartment);
router.get('/get', authenticate, getAllDepartmentNames);


module.exports = router;