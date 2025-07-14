// log.js
const axios = require("axios");
const getAuthToken = require("./auth"); // 👈 Import the auth function

const log = async (stack, level, pkg, message) => {
  try {
    const token = await getAuthToken();
    if (!token) {
      console.error("❌ Logging skipped: No valid token");
      return;
    }

    await axios.post(
      "http://20.244.56.144/evaluation-service/logs",
      {
        stack,
        level,
        package: pkg,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (err) {
    console.error("Logging failed:", err.message);
  }
};

module.exports = log;
