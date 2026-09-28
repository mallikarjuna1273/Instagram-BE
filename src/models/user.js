const mongoose = require("mongoose");
const validator = require("validator");
const { DEFAULT_IMG_URL } = require("../utils/constants");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: [4, "FirstName must be greater than 4 characters"],
      maxLength: [50, "FirstName must be less than 50 characters"],
      trim: true,
    },
    lastName: {
      type: String,
      maxLength: [50, "lastName must be less than 50 characters"],
      trim: true,
    },
    emailId: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Enter a valid email address");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a strong password");
        }
      },
    },
    age: {
      type: Number,
      min: [18, "age must be greater than 18 to get an account"],
    },
    gender: {
      type: String,
      lowercase: true,
      enum: {
        values: ["male", "female", "others"],
        message: `{VALUE} in not listed`,
      },
    },
    about: {
      type: String,
      default: "hey i'm using instagram lite version",
      maxLength: [300, "FirstName must be less than 50 characters"],
      trim: true,
    },
    interests: {
      type: [String],
      max: [10, "FirstName must be less than 50 characters"],
    },
    photoUrl: {
      type: String,
      default: DEFAULT_IMG_URL,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new error("Enter a valid URL");
        }
      },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
