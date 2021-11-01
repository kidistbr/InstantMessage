
const express = require('express');
const dbConfig = require("./config/db.config");
const db = require("./model");
db.sequelize.sync().then(() => {
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
app.set("port", 3001);

const connection = mysql.createConnection({
  host     : dbConfig.HOST,
  user     : dbConfig.USER,
  password : dbConfig.PASSWORD,
  database : dbConfig.DB
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

app.use("/api", function(req,res,next){
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type,Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
  next();
});
app.use('/api', routes);


