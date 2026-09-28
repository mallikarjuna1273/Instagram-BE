const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { SAFETY_KEY } = require("../utils/constants");

const authCheck = async (req, res, next) => {
  const { token } = req.cookies;

  const { _id } = await jwt.verify(token, SAFETY_KEY);
  if (!_id) {
    throw new Error("Token is not valid");
  }

  const user = await User.findOne({ _id: _id });

  if (!user) {
    throw new Error("User not found");
  }

  req.user = user;
  next();
};

module.exports= authCheck;