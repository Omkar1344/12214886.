const axios = require('axios');

const authData = {
//   email: "omkar.pradipmore005@gmail.com",
//   name: "Omkar Pradip More",
//   rollNo: "12214886",
//   accessCode: "CZypQK",
//   clientID: "c440f451-a2ec-4ad6-adbc-c42b78624009",
//   clientsecret: "exXYUxJTNgmYNNSP"
  email: "singhmohit8039@gmail.com",
  name: "Mohit Singh",
  rollNo: "12220396",
  accessCode: "CZypQK",
  clientID: "45ff5851-3a7b-488e-a718-d77b849617c0",
  clientsecret: "UDvUfRefGyAZMCTV"
};

axios.post("http://20.244.56.144/evaluation-service/auth", authData)
  .then(response => {
    console.log("✅ Auth Successful!");
    console.log("🔁 Full Response:", response.data);
  })
  .catch(error => {
    console.error("❌ Auth failed:", error.response?.data || error.message);
  });

