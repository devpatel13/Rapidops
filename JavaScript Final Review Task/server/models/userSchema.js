const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  profilePicID: {
    type: Number,
  },
  isSubscribed: {
    type: Boolean,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
