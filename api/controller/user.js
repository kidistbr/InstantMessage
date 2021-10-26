const db = require("../model")
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");


const User =db.Users;

module.exports.getAllUsers = function(req, res){
    console.log("Inside user controller");
    User.findAll({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
}

module.exports.register = function (req, res) {
    const Username = req.body.Username;
    const Name = req.body.Name || null;
    const Password = bcrypt.hashSync(req.body.Password, bcrypt.genSaltSync(10));
    const email = req.body.email;
    User.findAll({where: {Username:Username} })
    .then(data =>{
        console.log("User data", data.length)
        if(data && data.length>0)
            res.status(403).json({message:"User Name already exists, please choose a new one"});
    })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred."
        });
      });
    console.log("Registering user");
    User.create({ Username: Username, Name: Name, Password: Password, email: email})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      });
};

module.exports.login = function (req, res) {
    console.log("Logging in user");
    const Username = req.body.Username;
    const Password = req.body.Password;
    console.log(req.body);
    User.findAll({where: {Username:Username} })
    .then(user =>{
        if(user.length>0){
            console.log("user found", user);
            if (bcrypt.compareSync(Password, user[0].dataValues.Password)) {
                const token = jwt.sign({ username: user.username }, "im", { expiresIn: 3600 });
                console.log("token",token);
                res.status(200).json({ success: true, token: token });
                return;
            } 
            else { 
                res.status(401).json("Unauthorized"); 
            }
        }
        else { 
            console.log("user not found", user); 
            res.status(400).json("Unauthorized"); 
        }
        
    })
    .catch(err => {
        console.log("Catch block", err);

        res.status(500).send({
          message:
            err.message || "Some error occurred."
        });
      });
};

module.exports.authenticate = function (req, res, next) {
    var headerExists = req.headers.authorization;
    if (headerExists) {
        var token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "im", function (err, decoded) {
            if (err) {
                console.log(err); res.status(401).json("Unauthorized");
            } else {
                req.user = decoded.username;
                next();
            }
        });
    } else { res.status(403).json("No token provided"); }
};