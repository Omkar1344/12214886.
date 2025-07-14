// auth.js
const axios = require("axios");

const getAuthToken = async () => {
  try {
    const response = await axios.post("http://20.244.56.144/evaluation-service/auth", {
      email: "omkar.pradipmore005@gmail.com",
      name: "Omkar Pradip More",
      rollNo: "12214886",
      accessCode: "CZypQK",
      clientID: "c440f451-a2ec-4ad6-adbc-c42b78624009",
      clientsecret: "exXYUxJTNgmYNNSP"
    });
    // console.log token in auth.js
console.log("Access Token:", response.data["access_token"]);


    return response.data["access_token"];
  } catch (err) {
    console.error("❌ Failed to get auth token:", err.message);
    return null;
  }
};

module.exports = getAuthToken;
