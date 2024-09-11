const express = require('express')
const authorize = require('../middlewares/authorize')
const authenticate = require('../middlewares/auth');
const isAdminorManager = require('../middlewares/isAdminorManager')
const {
    createUser,updateUser,deleteUser, getUser, getAllUsers,
    promoteOrDemoteUser} = require('../contollers/userControllers')
    const {createOrUpdateProfile, getProfile} = require('../contollers/userProfileController')


const router = express.Router();



// router.use(authenticate); 

// Admin or Manager or dean or chairperson can create users
// router.post('/create', authorize(['admin', 'manager', 'dean', 'chairperson']), userController.createUser);
router.post('/create', authenticate, authorize(['admin','manager', 'dean', 'chairperson', 'researcher']), createUser);

router.put('/promote/:id', authenticate, authorize(['admin','manager', 'dean', 'chairperson', 'researcher']), promoteOrDemoteUser);

// Admin or Manager or dean or chairperson can update users
router.put('/update/:id',authenticate,  updateUser);

// Admin or Manager or dean or chairperson can delete users
router.delete('/delete/:id',authenticate, authorize(['admin', 'manager']), deleteUser);

// All roles can get their own data
router.get('/me/:id',authenticate, authorize(['admin', 'manager', 'dean', 'chairperson', 'researcher']), getUser);

router.get('/allUsers',authenticate,
    isAdminorManager, authorize(['admin', 'manager', 'dean', 'chairperson', 'researcher']), getAllUsers )

// Admin or Manager can get all users
// router.get('/', authorize(['admin', 'manager']), userController.getAllUsers);


//profileRoutes 
router.post('/profile', authenticate, createOrUpdateProfile);
router.put('/profile', authenticate, createOrUpdateProfile);
router.get('/profile', authenticate, getProfile);



module.exports = router