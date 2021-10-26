const express = require('express');
const dbConfig = require("./config/db.config");
const db = require("./model");
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });

const app = express();
const mysql = require('mysql');

const routes = require('./routes');


const Sequelize = require('sequelize');

// const sequelize = new Sequelize('instantmesseging', 'root', 'password', {
//     host: 'localhost',
//     dialect:  'mysql' 
//   });

//const routes = 
app.set("port", 3000);

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'instantmesseging'
});

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
  });

//   let normalizedPath = require('path').join(__dirname, "model")
//     require('fs').readdirSync(normalizedPath).forEach((file) => {
//         sequelize.import('./model/' + file)
//     })
// let {User} = sequelize.models;

const server = app.listen(app.get("port"), function(){
    const port = server.address().port;
    console.log("Listening to port", port);

})
app.use(express.urlencoded({extended : false}));
app.use(express.json({extended : false}));
app.use('/api', routes);

