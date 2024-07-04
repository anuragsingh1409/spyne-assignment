const express = require("express");
const router = express.Router();

const { loginUser, signupUser } = require("../controllers/auth");

router.post("/login", loginUser);
router.post("/register", signupUser);

module.exports = router;
