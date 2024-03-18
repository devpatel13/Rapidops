const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const { json } = require("express");

const authenticate = async (req, res, next) => {
  try {
    // console.log(req.cookies.user);
    let user = req.cookies.user;
    // console.log(user);
    if (!user || user == undefined) {
      res.status(403).json({
        isAuthenticated: false,
      });
    } else {
      user = JSON.parse(user);
      const decodedToken = jwt.verify(user.token, process.env.SECERET_KEY);
      //   console.log(decodedToken);
      req.user = { ...user, token: decodedToken };
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ isAuthenticated: false });
  }
};

module.exports = authenticate;
