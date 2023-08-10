import axios from "axios";
import { host } from "./host";
export async function validateForm(name, value) {
  let msg = "";

  if (value.length == 0) return "*Field can't be empty";

  if (name == "username") {
    if (!value.match(/^[a-z0-9_]+$/)) {
      msg = `*username should only contain: \nlower case\n numbers\n undescore`;
    }
    try {
      await axios.post(`${host}/api/checkCred`, {
        username: value,
      });
    } catch (error) {
      msg = "*" + error.response.data.message;
    }
  } else if (name == "email") {
    if (!value.match(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/)) {
      msg = "*Invalid email.";
    }
    try {
      await axios.post(`${host}/api/checkCred`, {
        email: value,
      });
    } catch (error) {
      msg = "*" + error.response.data.message;
    }
  } else if (name == "password") {
    if (value.length < 8) msg += `*atleast 8 characters.\n`;
    if (!value.match(/[a-z]/g)) msg += `*atleast one lowercase.\n`;
    if (!value.match(/[A-Z]/g)) msg += `*atleast one uppercase.\n`;
    if (!value.match(/[0-9]/g)) msg += `*atleast one digit.\n`;
    if (!value.match(/[!@#$%^&*]/g)) msg += `*atleast one special character.\n`;

    if (msg.length != 0) msg = "Password must contain\n" + msg;
  }

  return msg;
}
