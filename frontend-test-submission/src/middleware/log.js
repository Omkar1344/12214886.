// src/middleware/log.js
import axios from "axios";

const log = async (stack, level, pkg, message) => {
  try {
    await axios.post("http://localhost:5000/frontend-log", {
      stack,
      level,
      pkg,
      message,
    });
  } catch (err) {
    console.error("Logging failed:", err.message);
  }
};

export default log;
