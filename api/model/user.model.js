const sequelize = require('sequelize');
const UserModel = (sequelize, Sequelize) => {
    const {INTEGER, STRING, FLOAT, BOOLEAN, DATE} = Sequelize
    const User = sequelize.define('User', {
        UserId: {type: INTEGER, primaryKey: true, autoIncrement: true},
        Username: {type: STRING, primaryKey: true, allowNull: false},
        Name: STRING,
        Password: STRING,
        email: STRING
    })
    return User;
}
module.exports = UserModel







// const { Sequelize, Op, Model, DataTypes, STRING } = require('sequelize')


// const sequelize = new Sequelize('sqlite::memory:')
// const UserModel = sequelize.define('user', {
//   Username: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   UserId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   Name: DataTypes.STRING,
//   Password: DataTypes.STRING,
//   email: {
//     type: DataTypes.STRING(64),
//     is: [/.+@.+\..+/, 'Must use a valid email address'],
//   },
// })
// ;(async () => {
//   await sequelize.sync({ force: true })
//   // Code here
// })()

// module.exports = UserModel;
