const { DataTypes } = require("sequelize");
const sequelize = require("../config/mysqlConnection");
const User = require("./userModels");
const Department = require("./departmentmodel");


const NationalInternationalGrant = sequelize.define('NationalInternationalGrant', {
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
        allowNull: false,
        references: {
            model: Department,
            key: 'id'
        }
    },
    proposalCover: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    executiveSummary: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    academicSectoralCollaborators: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    projectDescription: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    projectManagement: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    implementationTimeline: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    physicalResourcesAndFacilities: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    scientificPersonnel: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    principalInvestigatorsAvailedResearchGrantDetails: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    riskManagementStrategy: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    listOfReferences: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    proposedProjectBudget: {
        type: DataTypes.JSON,
        allowNull: true,
    },
}, {
    tableName: 'national_international_grants',
    timestamps: true,
});

module.exports = NationalInternationalGrant;
