const Message = require("../models/messageModel");

const addMessage = async (req, res) => {
  const { from, to, message } = req.body;
  const data = Message.create({
    text: message,
    users: [from, to],
    sender: from,
  });

  if (data) res.status(200).json({ message: "Message added successfully" });
  else res.status(400).json({ message: "Message was not added." });
};

const getAllMessages = async (req, res) => {
  const { from, to } = req.query;
  const messages = await Message.find({
    users: {
      $all: [from, to],
    },
  }).sort({ updatedAt: 1 });
  const projectedMessages = messages.map((msg) => {
    return {
      fromSelf: msg.sender.toString() === from,
      message: msg.text,
    };
  });
  res.json(projectedMessages);
};

module.exports = { addMessage, getAllMessages };
