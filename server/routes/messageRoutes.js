const {
  addMessage,
  getAllMessages,
} = require("../controllers/messageController");

const router = require("express").Router();

router.post("/addmessage", addMessage);
router.get("/getallmessage", getAllMessages);

module.exports = router;
