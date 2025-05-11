const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  dob: { type: Date },
});

module.exports = mongoose.model("User", userSchema);
