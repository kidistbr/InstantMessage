const sequelize = require('sequelize');
const UserModel = (sequelize, Sequelize) => {
    const {INTEGER, STRING, FLOAT, BOOLEAN, DATE} = Sequelize
    const User = sequelize.define('User', {
        UserId: {type: INTEGER, primaryKey: true, autoIncrement: true},
        Username: {type: STRING, primaryKey: true, allowNull: false},
        Name: STRING,
        Password: STRING
    })
    return User;
}

module.exports = UserModel