const { DataTypes } = require('sequelize');
const sequelize = require('../config/mysqlConnection');
const Department = require('../Models/departmentmodel')


const IntellectualProperty = sequelize.define('IntellectualProperty', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    OwnerIp: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fieldofinvention: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    backgroundofinvention: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    descriptionofinvention: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    refrences: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    inventivesteps: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        },
    },
    createdBy: {
        type: DataTypes.STRING, // Adjust the type if needed
        allowNull: true,
      },
      
    departmentId: {
        type: DataTypes.INTEGER,
        references: {
          model: Department,
          key: 'id'
        }
      }

}, {
    tableName: 'intellectual_properties',
    timestamps: true,
});

module.exports = IntellectualProperty;