const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("../db/connect");
const User = require("../models/userSchema");
const Page = require("../models/pageSchema");

// get requests
router.get("/", (req, res) => {
  res.status(200).send("Runni");
});

//post requests
router.post("/signup", async (req, res) => {
  const { username, password, email, isSubscribed } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Fill all Fields" });
  }

  try {
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(409).json({ error: "User already Exists" });
    }

    // encodePass
    const encryptedPass = await bcrypt.hash(password, 10);
    const profilePicID = Math.floor(Math.random() * 6);
    if (!isSubscribed) isSubscribed = true;

    const user = await User.create({
      username,
      password: encryptedPass,
      email,
      profilePicID,
      isSubscribed,
    });

    if (user) {
      res.status(201).json({ message: "User Registered" });
    }
  } catch (error) {
    console.log(err);
  }
});

module.exports = router;
