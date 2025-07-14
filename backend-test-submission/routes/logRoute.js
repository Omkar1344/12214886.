// routes/logRoute.js
const express = require("express");
const router = express.Router();
const log = require("../middleware/log");

router.post("/", async (req, res) => {
  const { stack, level, pkg, message } = req.body;
  try {
    await log(stack, level, pkg, message);
    res.status(200).json({ message: "Log sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Logging failed" });
  }
});

module.exports = router;
