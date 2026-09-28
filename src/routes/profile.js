const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { SAFETY_KEY, ALLOWED_UPDATES } = require("../utils/constants");
const authCheck = require("../middlewares/auth");

const profileRouter = express.Router();

// profile view

profileRouter.get("/profile/view",authCheck, async (req, res) => {
  try {
    // const { token } = req.cookies;
    // const { _id } = await jwt.verify(token, SAFETY_KEY);
    // if (!_id) {
    //   throw new Error("Token is not valid");
    // }
    // const userDetails = await User.findById({ _id: _id });
    // if (!userDetails) {
    //   throw new Error("User not found");
    // }
    const userDetails = req.user;
    res.status(200).json({
      message: `${userDetails.firstName} your profile fetched successfully`,
      data: userDetails,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

// profile edit

profileRouter.patch("/profile/edit",authCheck, async (req, res) => {
  try {
    // const { token } = req.cookies;
    // const { _id } = await jwt.verify(token, SAFETY_KEY);
    // if (!_id) {
    //   throw new Error("Token is not valid");
    // }
    // const userDetails = await User.findOne({ _id: _id });
    // if (!userDetails) {
    //   throw new Error("User not found");
    // }
    const userDetails = req.user;
    const userInfo = req.body;
    const isValidUpdate = Object.keys(userInfo).every((k) =>
      ALLOWED_UPDATES.includes(k),
    );
    if (!isValidUpdate) {
      throw new Error("Request is not valid check your details");
    }

    Object.keys(userInfo).forEach((key) => (userDetails[key] = userInfo[key]));

    await userDetails.save();

    res.status(201).json({
      message: `${userDetails.firstName} your profile updated successfully`,
      data: userDetails,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

module.exports = profileRouter;
