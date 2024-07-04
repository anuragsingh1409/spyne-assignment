const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUserByName,
} = require("../../controllers/userService/getUser");

router.get("/get-all-users", getAllUsers);
router.get("/get-user-by-name/:name", getUserByName);

module.exports = router;
