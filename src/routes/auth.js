const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { SAFETY_KEY } = require("../utils/constants");

const authRouter = express.Router();

// create a new user

authRouter.post("/signUp", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      emailId,
      password,
      age,
      gender,
      about,
      interests,
      photoUrl,
    } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
      age,
      gender,
      about,
      interests,
      photoUrl,
    });
    await user.save();
    const userId = user._id.toString();
    const token = await jwt.sign({ _id: userId }, SAFETY_KEY, {
      expiresIn: "1h",
    });
    res
      .cookie("token", token)
      .status(200)
      .json({
        message: `${firstName} your account created successfully`,
        data: user,
      });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

// login user

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const userInfo = await User.findOne({ emailId: emailId });

    if (!userInfo) {
      throw new Error("Enter a valid credentials");
    }

    const decryptPassword = await bcrypt.compare(password, userInfo.password);

    if (!decryptPassword) {
      throw new Error("Enter a valid credentials");
    }

    const token = await jwt.sign({ _id: userInfo._id }, SAFETY_KEY, {
      expiresIn: "1h",
    });

    res
      .cookie("token", token)
      .status(200)
      .json({
        message: `${userInfo.firstName} you are loggedIn successfully`,
        data: userInfo,
      });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

// update password

authRouter.patch("/updatePassword", async (req, res) => {
  try {
    const { token } = req.cookies;
    const {password} = req.body;
    const { _id } = await jwt.verify(token, SAFETY_KEY);
    if (!_id) {
      throw new Error("Token is not valid");
    }
    const userDetails = await User.findOne({ _id });
    if (!userDetails) {
      throw new Error("User not found");
    }

     const hashPassword = await bcrypt.hash(password, 10)

     userDetails.password = hashPassword
     await userDetails.save()

     res.status(200).json({
        message:"password update successfully",
        data: userDetails
     })



  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

//  logout user

authRouter.post("/logout", (req, res) => {
  res
    .cookie("token", null, { expires: new Date(Date.now()) })
    .status(200)
    .json({
      message: "logout successfully",
    });
});

module.exports = authRouter;
