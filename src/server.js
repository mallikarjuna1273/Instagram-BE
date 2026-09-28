const express = require("express");
const cookieParser = require("cookie-parser");
const { PORT } = require("./utils/constants");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const connectDB = require("./config/db");
const connectionRouter = require("./routes/connections");
const userRouter = require("./routes/user");

const server = express();

server.use(express.json());
server.use(cookieParser());

server.use("/", authRouter);
server.use("/", profileRouter);
server.use("/", connectionRouter);
server.use('/', userRouter)

connectDB()
  .then(() => {
    console.log("DB connection is Established...");
    server.listen(PORT, () => {
      console.log("Server is started on port " + PORT);
    });
  })
  .catch(() => {
    console.log("DB connection is not Established...");
  });
