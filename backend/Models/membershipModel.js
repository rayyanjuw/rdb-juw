const User = require( './userModels');
const { DataTypes } = require("sequelize");
const sequelize = require("../config/mysqlConnection");


const Membership = sequelize.define('Membership', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    description: {
        type: DataTypes.JSON,
        allowNull: false
    }
}, {
    tableName: 'memberships',
    timestamps: true,
});

module.exports = Membership;