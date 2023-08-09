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
      res.status(200).json({
        id: isUser._id,
        avatarImage: isUser.avatarImage,
        token: generateToken(isUser._id, isUser.avatarImage),
      });
    } else res.status(400).json({ message: "Incorrect password" });
  }
};

const getUserDetails = async (req, res) => {
  const id = req.query.id;
  const user = await User.findById(id);
  if (user)
    res.status(200).json({
      id: user._id,
      username: user.username,
      avatarImage: user.avatarImage,
    });
  else res.status(400).json({ message: "User not found" });
};

const getChats = async (req, res) => {
  const id = req.query.id;
  const chats = await User.find({ _id: { $ne: id } });
  if (chats) {
    const filter = chats.map((chat) => ({
      id: chat._id,
      username: chat.username,
      avatarImage: chat.avatarImage,
    }));

    res.status(200).json({ filter });
  } else res.status(400).json({ message: "something went wrong." });
};

const setAvatarImage = async (req, res) => {
  const { id, avatarImage } = req.body;

  const avatar = await User.findByIdAndUpdate(
    { _id: id },
    { avatarImage: avatarImage }
  );
  if (avatar)
    res.status(200).json({
      message: "Image updated Successfully.",
      token: generateToken(avatar._id, avatar.avatarImage),
    });
  else res.status(400).json({ message: "Error updating avatar." });
};

const generateToken = (id, avatarImage) => {
  if (avatarImage == "") avatarImage = false;
  else avatarImage = true;
  return jwt.sign({ id, avatarImage }, process.env.JWT_SECRET, {
    expiresIn: "60d",
  });
};

const varifyUser = async (req, res) => {
  const token = req.body.token;
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  res.json(decode);
};
module.exports = {
  registerUser,
  validateCred,
  login,
  varifyUser,
  setAvatarImage,
  getUserDetails,
  getChats,
};
