const { DataTypes } = require("sequelize");
const sequelize = require("../config/mysqlConnection");
const User = require("./userModels");
const Department = require("./departmentmodel");

const ORICFundedProject = sequelize.define('ORICFundedProject', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
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
    title: {
        type: DataTypes.STRING,
        allowNull: true,

    },
    proposalCover: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    researchProject:{
        type: DataTypes.JSON,
        allowNull: true,
    },
    facilitiesandFunding:{
        type: DataTypes.JSON,
        allowNull: true,
    },
    justificationForBudgetItems: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    estimatedBudget: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
    },
    createdBy: {
        type: DataTypes.STRING, // Adjust the type if needed
        allowNull: true,
      },
}, {
    tableName: 'oric_funded_projects',
    timestamps: true,
})


module.exports = ORICFundedProject;