import { Routes, Route, useNavigate } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import Chat from "./pages/chat";
import { useEffect } from "react";
import axios from "axios";
import SetAvatar from "./pages/setAvatar";
import { host } from "./utils/host";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      let token = localStorage.getItem("token");
      (async function () {
        let verify = await axios.post(`${host}/api/verifyUser`, {
          token: token,
        });
        if (verify) {
          console.log(verify.data.avatarImage);
          sessionStorage.setItem("userId", verify.data.id);
          if (verify.data.avatarImage === false) navigate("/setAvatar");
          else navigate("/chat");
        } else navigate("/login");
      })();
    }
  }, []);
  return (
    <>
      <Routes>
        <Route index element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
      </Routes>
    </>
  );
}

export default App;
