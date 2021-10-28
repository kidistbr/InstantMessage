const sequelize = require('sequelize');
const UserModel = (sequelize, Sequelize) => {
    const {INTEGER, STRING, FLOAT, BOOLEAN, DATE} = Sequelize
    const User = sequelize.define('User', {
        userId: {type: INTEGER, primaryKey: true, autoIncrement: true},
        // username: {type: STRING, primaryKey: true, allowNull: false},
        firstName: STRING,
        lastName:STRING,
        password: STRING,
        email: STRING,
        role: STRING
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
