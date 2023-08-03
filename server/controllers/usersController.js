const User = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    res.status(400).json({ message: "Please provide all fields" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ username, email, password: hashedPassword });
  if (user)
    res
      .status(200)
      .json({ message: "Resitration successfull you may login now." });
};

const validateCred = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  console.log(username, email);
  if (username) {
    const checkUsername = await User.findOne({ username });
    if (checkUsername) res.status(400).json({ message: "username taken" });
    else res.status(200).json({ message: "username vailable" });
  }
  if (email) {
    const checkEmail = await User.findOne({ email });
    if (checkEmail) res.status(400).json({ message: "Email already exists." });
    else res.status(200).json({ message: "" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const isUser = await User.findOne({ username });
  if (!isUser) res.status(400).json({ message: "Invalid username." });
  else {
    const isValid = await bcrypt.compare(password, isUser.password);
    if (isValid) {
      res.status(200).json({ token: generateToken(isUser._id) });
    } else res.status(400).json({ message: "Incorrect password" });
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "60d" });
};

const varifyUser = async (req, res) => {
  const token = req.body.token;
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  res.json(decode);
};
module.exports = { registerUser, validateCred, login, varifyUser };
