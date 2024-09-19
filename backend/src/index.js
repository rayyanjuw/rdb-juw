const express = require('express');

// const mysql = require('mysql2');
const app = express();
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
const NationalInternationalGrant = require('../routes/nationalRouter')



app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors())

app.use('/upload', express.static('upload'));


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




