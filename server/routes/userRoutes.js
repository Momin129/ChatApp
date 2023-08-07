const express = require("express");
const {
  registerUser,
  validateCred,
  login,
  varifyUser,
  setAvatarImage,
  getUserDetails,
  getChats,
} = require("../controllers/usersController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/checkCred", validateCred);
router.post("/login", login);
router.post("/verifyUser", varifyUser);
router.post("/setAvatar", setAvatarImage);
router.get("/getuserdetails", getUserDetails);
router.get("/getChats", getChats);

module.exports = router;
