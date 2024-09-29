const { DataTypes } = require('sequelize');
const sequelize = require('../config/mysqlConnection');

const FundedProject = sequelize.define('FundedProject', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date_of_acceptance: {
        type: DataTypes.DATEONLY, // YYYY-MM-DD format
        allowNull: false,
    },
    agency: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    total_award_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    }
}, {
    tableName: 'funded_projects',
    timestamps: true,
});

module.exports = FundedProject;
