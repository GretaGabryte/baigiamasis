const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const USERNAME = "admin";
const PASSWORD = "password";
const SECRET_KEY = process.env.JWT_SECRET;

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === USERNAME && password === PASSWORD) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
  }
  console.log("Login failed");
  res.status(401).json({ message: "Invalid credentials" });
});

module.exports = { authRouter: router, SECRET_KEY };
