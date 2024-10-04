// models/associations.js

const User = require('./userModels');
const Publication = require('./Publication');
const IntellectualProperty = require('./IntellectualProperty');
const Department = require('./departmentmodel');
const UserProfile = require('./userProfile');
const Honor = require('./honorsAwardsModels');
const Membership = require('./membershipModel');
const PublicationofFaculty = require('./PublicationofFaculty');
const CompletedProject = require('./CompleteProjectModel');
const NationalInternationalGrant = require('./nationalGrantsModels');
const ORICFundedProject = require("./ORICFundedProject")


// Define associations
User.hasMany(Publication, { foreignKey: 'userId', as: 'publications' });
Publication.belongsTo(User, { foreignKey: 'userId', as: 'creator' });

// Add other associations as needed

// A user can have many intellectual properties
User.hasMany(IntellectualProperty, {
    foreignKey: 'userId',
    as: 'intellectualProperties',
});

IntellectualProperty.belongsTo(User, {
    foreignKey: 'userId',
    as: 'creator',
})

// User-Department association
Department.hasMany(User, { foreignKey: 'departmentId', as: 'users' });
User.belongsTo(Department, { foreignKey: 'departmentId', as: 'department' });

// Associate UserProfile with User
UserProfile.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(UserProfile, { foreignKey: 'userId' });

User.hasMany(Honor, {
    foreignKey: 'userId',
    as: 'honors'
});

Honor.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});

// Department has many Honors
Department.hasMany(Honor, {
    foreignKey: 'departmentId',
    as: 'honors'
  });
  
  // Honor belongs to Department
  Honor.belongsTo(Department, {
    foreignKey: 'departmentId',
    as: 'department'
  });   

  User.hasMany(Membership, {
    foreignKey: 'userId',
    as: 'memberships'
  });

  Membership.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
  })

  User.hasMany(PublicationofFaculty, {
    foreignKey: 'userId',
    as: 'facultypublication'
  });
  
  PublicationofFaculty.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
  });
  User.hasMany(CompletedProject, {
    foreignKey: 'userId',
    as: 'completeproject'
  });

  CompletedProject.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
  });


  User.hasMany(NationalInternationalGrant, {
    foreignKey: 'userId',
    as: 'nationalgrants', // This will delete the related records when a user is deleted
    onDelete: 'CASCADE' 
  });
  
  NationalInternationalGrant.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
  });

  User.hasMany(ORICFundedProject, {
    foreignKey: 'userId',
    as: 'oricFunded', // This will delete the related records when a user is deleted
    onDelete: 'CASCADE' 
  });
  
  ORICFundedProject.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
  });
  

  

module.exports = { User, Publication, IntellectualProperty, Department, PublicationofFaculty, CompletedProject };
