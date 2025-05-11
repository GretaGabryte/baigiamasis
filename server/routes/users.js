const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("./auth");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Token required" });
  try {
    jwt.verify(token, SECRET_KEY);
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

router.get("/", verifyToken, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.post("/", verifyToken, async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

router.put("/:id", verifyToken, async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(user);
});

router.delete("/:id", verifyToken, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

module.exports = router;
