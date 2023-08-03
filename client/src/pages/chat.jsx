import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Chat() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!sessionStorage.getItem("userId")) navigate("/");
  }, []);

  return <div>Chat</div>;
}

export default Chat;
