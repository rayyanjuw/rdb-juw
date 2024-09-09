// models/associations.js

const User = require('./userModels');
const Publication = require('./Publication');
const IntellectualProperty = require('./IntellectualProperty');
const Department = require('./departmentmodel');
const UserProfile = require('./userProfile');


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



module.exports = { User, Publication, IntellectualProperty, Department };
