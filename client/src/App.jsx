import { Routes, Route, useNavigate } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import Chat from "./pages/chat";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      let token = localStorage.getItem("token");
      console.log(token);
      (async function () {
        let verify = await axios.post("http://localhost:4242/api/verifyUser", {
          token: token,
        });
        sessionStorage.setItem("userId", verify.data.id);
        navigate("/chat");
      })();
    }
  }, []);
  return (
    <>
      <Routes>
        <Route index element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </>
  );
}

export default App;
