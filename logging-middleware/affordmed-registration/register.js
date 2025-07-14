const axios = require('axios');

const registrationData = {
    // email: "omkar.pradipmore005@gmail.com",
    // name: "Omkar Pradip More",
    // mobileNo: "9579982770",
    // githubUsername: "Omkar1344",
    // rollNo: "12214886",
    // accessCode: "CZypQK"

    email: "singhmohit8039@gmail.com",
    name: "Mohit Singh",
    mobileNo:"6394035580",
    githubUsername: "MOHITSUSHILSINGH",
    rollNo: "12220396",
    accessCode: "CZypQK",
};

axios.post("http://20.244.56.144/evaluation-service/register", registrationData)
    .then(response => {
        console.log("✅ Registration Successful!");
        console.log("🔐 Client ID:", response.data.clientID);
        console.log("🔐 Client Secret:", response.data.clientSecret);
    })
    .catch(error => {
        console.error("❌ Registration failed:", error.response?.data || error.message);
    });
