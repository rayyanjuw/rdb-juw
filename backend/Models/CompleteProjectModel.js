const { DataTypes } = require("sequelize");
const sequelize = require("../config/mysqlConnection");
const User = require("../Models/userModels");
const Department = require("../Models/departmentmodel")

const CompletedProject = sequelize.define('CompleteProject', {
    userId: { // Link to the user who created the project
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, // Name of the Users table
            key: 'id'
        }
    },
    departmentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Department,
            key: 'id'
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date_of_completion: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    agency: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    total_award_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    tableName: 'completed_projects',
    timestamps: true,
});

module.exports = CompletedProject;