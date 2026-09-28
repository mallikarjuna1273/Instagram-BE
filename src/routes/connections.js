const express = require("express");
const authCheck = require("../middlewares/auth");
const User = require("../models/user");
const Connection = require("../models/connections");
const { ALLOW_REQUEST, ALLOW_RESPONSE } = require("../utils/constants");

const connectionRouter = express.Router();

// send interest / ignore

connectionRouter.post(
  "/request/:status/:toUserId",
  authCheck,
  async (req, res) => {
    try {
      const userInfo = req.user;
      const fromUserId = userInfo._id;
      const { status, toUserId } = req.params;
      const isValidStatus = ALLOW_REQUEST.includes(status);
      if (!isValidStatus) {
        throw new Error("Status is not valid");
      }
      const isValidToUserId = await User.findOne({ _id: toUserId });
      if (!isValidToUserId) {
        throw new Error("user not found");
      }
      const connectionValid = await Connection.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (connectionValid) {
        throw new Error("Request is already existed");
      }
      const connection = new Connection({
        fromUserId,
        toUserId,
        status,
      });
      await connection.save();
      res.status(200).json({
        message: `${status} request by ${userInfo.firstName}`,
        data: connection,
      });
    } catch (err) {
      res.status(400).json({
        message: err.message,
      });
    }
  },
);

// response accept / reject

connectionRouter.post(
  "/response/:status/:requestId",
  authCheck,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;
      const isAllowedStatus = ALLOW_RESPONSE.includes(status);
      if (!isAllowedStatus) {
        throw new Error("status is not valid");
      }
      const checkRequestId = await Connection.findOne({ _id: requestId });
      if (!checkRequestId) {
        throw new Error("Request id not found");
      }
      const connectionRequest = await Connection.findOne({
        fromUserId: checkRequestId.fromUserId.toString(),
        toUserId: loggedInUser._id.toString(),
        status: "interest",
      });

      if (!connectionRequest) {
        throw new Error("request not found");
      }
      connectionRequest.status = status;
      await connectionRequest.save();
      res.status(200).json({
        message: `${status}  by ${loggedInUser.firstName}`,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
);

module.exports = connectionRouter;
