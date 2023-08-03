const express = require("express");
const {
  registerUser,
  validateCred,
  login,
  varifyUser,
} = require("../controllers/usersController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/checkCred", validateCred);
router.post("/login", login);
router.post("/verifyUser", varifyUser);

module.exports = router;
