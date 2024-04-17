var express = require("express");
var router = express.Router();

const users = require("../controllers/users");
const { login } = require("../controllers/auth");

router.post("/users", users.create);

router.post("/login", login);

module.exports = router;
