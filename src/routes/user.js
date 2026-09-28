const express = require("express");
const authCheck = require("../middlewares/auth");
const Connection = require("../models/connections");
const User = require("../models/user");

const userRouter = express.Router();

// user requests

userRouter.get("/user/requests", authCheck, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const requests = await Connection.find({
      toUserId: loggedInUser._id,
      status: "interest",
    });
    if (requests.length === 0) {
      res.status(200).json({ message: "no connection requests found" });
    }
    res.status(200).json({
      message: `${loggedInUser.firstName} your connection requests fetched successfully`,
      data: requests,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

// user connections

userRouter.get("/user/connections", authCheck, async (req, res) => {
  try {
    const user = req.user;

    const { _id, firstName } = user;

    const connections = await Connection.find({
      $or: [
        { fromUserId: _id, status: "accept" },
        { toUserId: _id, status: "accept" },
      ],
    });
    if (connections.length === 0) {
      res.status(200).json({
        message: "No Connections found",
      });
    }
    res.status(200).json({
      message: `${firstName} your connections fetched successfully`,
      data: connections,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

// user suggestions

userRouter.get("/user/feed", authCheck, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { _id, firstName } = loggedInUser;

    const hiddenUsers = await Connection.find({
      $or: [{ fromUserId: _id }, { toUserId: _id }],
    });

    const users = new Set();

    hiddenUsers.forEach((key) => {
      (users.add(key.fromUserId.toString()),
        users.add(key.toUserId.toString()));
    });

    const connections = await User.find({
      $and: [
        { _id: { $nin: Array.from(users) } },
        { _id: { $ne: _id.toString() } },
      ],
    });
    if(connections.length === 0) {
        res.status(200).json({
            message:"There's no suggestions found"
        })
    }else{
    res.status(200).json({
      message: `${firstName} your suggestions fetched successfully`,
      data: connections,
    });
}
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

module.exports = userRouter;
