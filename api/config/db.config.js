// const mysql      = require('mysql');
// const connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'root',
//   database : 'instantmesseging'
// });

// connection.connect(function(err) {
//     if (err) {
//       console.error('error connecting: ' + err.stack);
//       return;
//     }
   
//     console.log('connected as id ' + connection.threadId);
//   });

// connection.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//   });

module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "root",
    DB: "instantmesseging",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };