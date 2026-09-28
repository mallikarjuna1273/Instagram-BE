const PORT = 8000;

const DB_URL =
  "mongodb+srv://mallikharjuna:mRjQzDxF8Jk9Ai1V@cluster0.yrusdla.mongodb.net/Instagram-BE";

const SAFETY_KEY = "INSTGRAMBE@BE";

const DEFAULT_IMG_URL =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHF4AhCvcexatMcCwFOUy7m3NasYf-JKxiLefKBq8o5MS7PrTk7GCWElnM&s=10";

const ALLOWED_UPDATES = [
  "firstName",
  "lastName",
  "age",
  "gender",
  "about",
  "interests",
  "photoUrl",
];

const ALLOW_REQUEST = ["interest", "ignore"];

const ALLOW_RESPONSE = ["accept", "reject"];

const SAFE_DATA = "firstName lastName photoUrl about interests";

module.exports = {
  PORT,
  DB_URL,
  SAFETY_KEY,
  DEFAULT_IMG_URL,
  ALLOWED_UPDATES,
  ALLOW_REQUEST,
  ALLOW_RESPONSE,
  SAFE_DATA,
};
