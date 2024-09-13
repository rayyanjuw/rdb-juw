const { DataTypes } = require('sequelize');
const sequelize = require('../config/mysqlConnection');
const User = require('./userModels');
const Department = require('./departmentmodel');

const PublicationofFaculty = sequelize.define('PublicationsOfFaculty', {
    researchPaperTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    webofScience: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    impactFactor: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    scopus: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    hecCategory: {
        type: DataTypes.STRING,
        allowNull: true
    },
    otherIndexing: {
        type: DataTypes.STRING,
        allowNull: true
    },
    firstAuthor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    secondAurthor: {
        type: DataTypes.STRING,
        allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    departmentId: {
        type: DataTypes.INTEGER,
        references: {
            model: Department,
            key: 'id'
        }
    },
    departmentName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'publication_of_faculty',
    timestamps: true
})

module.exports = PublicationofFaculty;