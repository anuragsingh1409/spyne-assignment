const express = require("express");
const router = express.Router();
const authRoutes = require("./auth");
const discussionRoutes = require("./discussion/index");
const userRoutes = require("./user/index");

router.use("/auth", authRoutes);
router.use("/discussion", discussionRoutes);
router.use("/user", userRoutes);

module.exports = router;
