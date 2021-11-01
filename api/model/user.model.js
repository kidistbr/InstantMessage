const sequelize = require('sequelize');
const OrganizationModel = require('./organization.model');
const db = require('./index');
const UserModel = (sequelize, Sequelize) => {
    const {INTEGER, STRING, FLOAT, BOOLEAN, DATE} = Sequelize
    const User = sequelize.define('User', {
        userId: {type: INTEGER, primaryKey: true, autoIncrement: true},
        firstName: STRING,
        lastName:STRING,
        password: STRING,
        email: STRING,
        role: STRING,

    organizationId: {
        type: INTEGER,
        references: {
          model: sequelize.OrganizationModel,
          key: 'organizationId'
        }
    }
    })
   User.belongsTo(OrganizationModel(sequelize, Sequelize), {foreignKey: 'organizationId', targetKey: 'organizationId'}); // Adds fk_companyname to User

   return User;
}
module.exports = UserModel

