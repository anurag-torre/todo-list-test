const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//bcrypt is a hashing algorithm which can only be encrypted but not decrypted so safe against dictionary attacks
const bcrypt = require("bcryptjs");
//Web token can be used to authenticate users
const jwt = require("jsonwebtoken");
const User = require("../model/User");

//post request to add a user through signup
router.post("/signup", async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(409).json({
      message: "Email Exists",
    });
  } else {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = await new User({
        email: req.body.email,
        password: hashedPassword,
      }).save();

      const token = jwt.sign(
        {
          email: user.email,
          userId: user._id,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "1h",
        }
      );

      return res.status(201).json({
        message: "Auth Successful",
        token: token,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
});

router.post("/login", async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({
      message: "Invalid UserName / Password",
    });
  }

  try {
    const result = await bcrypt.compare(req.body.password, user.password);
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "1h",
      }
    );
    return res.status(200).json({
      message: "Auth Successful",
      token: token,
    });
  } catch (error) {
    return res.status(401);
  }
});

module.exports = router;
