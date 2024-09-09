const { DataTypes } = require('sequelize');
const sequelize = require('../config/mysqlConnection');
const User = require('./userModels');

const UserProfile = sequelize.define('UserProfile', {
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cellPhone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    highestDegree: {
        type: DataTypes.STRING, // Degree name (e.g., MS, PhD)
        allowNull: true
    },
    yearOfDegree: {
        type: DataTypes.INTEGER, // Year of completion
        allowNull: true
    },
    latestInstitutionName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    latestJobTitle: {
        type: DataTypes.STRING,
        allowNull: true
    },
    latestExperienceFrom: {
        type: DataTypes.DATE,
        allowNull: true
    },
    latestExperienceTo: {
        type: DataTypes.DATE,
        allowNull: true
    }
},{
    tableName: 'user_profile',
    timestamps: true
});

module.exports = UserProfile;