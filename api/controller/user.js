const db = require("../model")
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");


const User =db.Users;
const Organization = db.Organization;

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
    // const username = req.body.username;
    const firstName = req.body.firstName || null;
    const lastName = req.body.lastName || null;
    const password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    const email = req.body.email;
    const emailDomain = email.split('@')[1];
    // let organizationId="";
    console.log("emailDomain", emailDomain);
    User.findAll({where: {email:email} })
    .then(data =>{
        console.log("User data", data.length)
        if(data && data.length>0){
          return res.status(403).json({message:"User Already Exists, Please Login."});
        }
        else{
          Organization.findAll({where:{emailDomain:emailDomain}})
          .then(organizationData =>{
            console.log("organizationData",organizationData);
            if(organizationData.length!=0){
              console.log("Inside if");
              const organizationId = organizationData[0].dataValues.organizationId;
              console.log("organization id", organizationId);
      
              User.create({firstName: firstName, lastName:lastName, password: password, email: email, organizationId: organizationId})
              .then(data => {
                return res.send(data);
              })
              .catch(err => {
                console.log("Catch block #3")
                return res.status(500).send({
                  message:
                    err.message || "Some error occurred while creating the User."
                });
              });
            }else{
              console.log("inside else");
              return res.status(403).json({message:"Invalid Email, please register with your organization email."});
            }
          })
        }
    })
    .catch(err => {
      console.log("Catch block #2")

        return res.status(500).send({
          message:
            err.message || "Some error occurred."
        });
      });

};

module.exports.login = function (req, res) {
    console.log("Logging in user");
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body);
    User.findAll({where: {email:email} })
    .then(user =>{
        if(user.length>0){
            console.log("user found", user);
            if (bcrypt.compareSync(password, user[0].dataValues.password)) {
              console.log("lastName"+user.lastName);
              console.log("firstName"+user.firstName);
                const token = jwt.sign({ 
                  id: user[0].dataValues.userId,
                  name: user[0].dataValues.firstName+" "+user[0].dataValues.lastName }, "im", { expiresIn: 3600 });
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