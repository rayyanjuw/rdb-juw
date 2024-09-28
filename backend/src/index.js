const express = require('express');

// const mysql = require('mysql2');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;
const cors = require('cors');
const userRouter = require('../routes/userRoutes')
const authRouter = require('../routes/authRoute')
const publicationRouter = require('../routes/publicationRoute');
const intellectualproperty = require('../routes/intellectualPropRoutes');
const Department = require('../Models/departmentmodel');
const isAdminorManager = require('../middlewares/isAdminorManager');
const authenticate = require('../middlewares/auth');
const honorsReward = require('../routes/honorRoutes');
const Membership = require('../routes/membershipRoutes');
const FacultyPublication = require('../routes/facultypublicationRoutes');
const ORICFundedProject = require('../routes/oricfundedRoutes');
const NationalInternationalGrant = require('../routes/nationalRouter');
const DepartmentRoute = require("../routes/DepartmentRoute");
const CompletedProjectRouter = require("../routes/completedprojectRoutes")
const FundedProjectRouter = require("../routes/fundedprojectRoutes")
const UPLOAD_DIR = process.env.UPLOAD_DIR || 'uploads';



app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(cors());

require('../Models/association')
// Import the sequelize instance to ensure the connection is established
require('../config/mysqlConnection'); // Ensure this line is present




// app.use(isAdminorManager);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/publication', publicationRouter);
app.use('/api/intellectualproperty', intellectualproperty);
app.use('/api/honors', honorsReward );
app.use('/api/membership', Membership);
app.use('/api/facultypublication', FacultyPublication );
app.use('/api/oricfundedproject', ORICFundedProject);
app.use('/api/nationalGrant', NationalInternationalGrant);
app.use('/api/department', DepartmentRoute);
app.use('/api/completedProjects', CompletedProjectRouter)
app.use('/api/fundedProjects', FundedProjectRouter )
app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// require('../routes')
// Department.bulkCreate([
//     { name: 'Computer Science' },
//     { name: 'Medical Science' },
//     { name: 'Food Science' },
//     { name: 'Commerce' },
// ])
// .then(() => console.log('Departments seeded successfully'))
// .catch(error => console.log('Error seeding departments:', error));


app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});




