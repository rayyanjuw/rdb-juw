const { DataTypes } = require("sequelize");
const sequelize = require("../config/mysqlConnection");
const User = require("./userModels");
const Department = require("./departmentmodel");

const Honor = sequelize.define('Honor', {
 
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
        allowNull: true,
        references: {
            model: Department,
            key: 'id'
        }
    },
    academicAwards: {
        type: DataTypes.JSON,
        allowNull: true
    },
    professionalAwards: {
        type: DataTypes.JSON,
        allowNull: true
    }
}, {
    tableName: 'honors_awards',
    timestamps: true
});

module.exports = Honor; 