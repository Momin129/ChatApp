/* eslint-disable react/prop-types */
import { Box, TextField } from "@mui/material";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
export default function InputFiled({ handleMessages }) {
  const [msg, setMsg] = useState("");
  const [isPicker, setPicker] = useState(false);
  return (
    <>
      {isPicker && (
        <Box
          sx={{
            position: "absolute",
            top: { xs: 0, md: "auto" },
            zIndex: 1,
          }}
        >
          <Picker
            data={data}
            previewPosition="none"
            onEmojiSelect={(e) => {
              setMsg(msg + e.native);
            }}
          />
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          border: 2,
          borderColor: "#1D267D",
          borderRadius: 5,
          paddingX: 2,
        }}
      >
        <EmojiEmotionsIcon onClick={() => setPicker(!isPicker)} />
        <TextField
          name="message"
          type="text"
          value={msg}
          sx={{
            width: "90%",
            color: "white",
            "& fieldset": { border: "none", color: "white" },
            "& .MuiOutlinedInput-input": { color: "white" },
          }}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              setPicker(false);
              handleMessages(msg);
              setMsg("");
            }
          }}
        />
        <SendIcon
          onClick={() => {
            setPicker(false);
            handleMessages(msg);
            setMsg("");
          }}
        />
      </Box>
    </>
  );
}
