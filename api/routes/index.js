const express = require('express');
const router = express.Router();
const userController = require("../controller/user");

router.route("/users")
       .get(userController.getAllUsers);
router.route("/users/register")
        .post(userController.register);
router.route("/users/login").post(userController.login);
router.route("/users/online").get(userController.onlineUser);
module.exports = router;