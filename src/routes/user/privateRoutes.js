const express = require("express");
const router = express.Router();

const { followUser } = require("../../controllers/userService/followUser");
const {
  updateUser,
  deleteUser,
} = require("../../controllers/userService/modifyUser");

router.get("/follow/:userId", followUser);
router.put("/update", updateUser);
router.delete("/delete", deleteUser);

module.exports = router;
