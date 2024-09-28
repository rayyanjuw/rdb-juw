const { DataTypes } = require("sequelize");
const sequelize = require("../config/mysqlConnection");
const User = require("../Models/userModels")

const CompletedProject = sequelize.define('CompleteProject', {
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
    userId: { // Link to the user who created the project
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, // Name of the Users table
            key: 'id'
        }
    }
}, {
    tableName: 'completed_projects',
    timestamps: true,
});

module.exports = CompletedProject;