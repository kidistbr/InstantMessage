const sequelize = require('sequelize');
const OrganizationModel = (sequelize, Sequelize) => {
    const {INTEGER, STRING, FLOAT, BOOLEAN, DATE} = Sequelize
    const Organization = sequelize.define('Organization', {
        organizationId: {type: INTEGER, primaryKey: true, autoIncrement: true},
        organizationName: STRING,
        emailDomain: STRING,
        description:STRING,
    })
    return Organization;
}
module.exports = OrganizationModel