const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const postRouter = require("./routes/post");
const router = require("./routes/auth");
const secondRouter = require("./routes/users");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

dotenv.config();

mongoose.connect("mongodb://127.0.0.1:27017/test").then(() => {
  console.log("connected successfully!");
});

const PORT = 3002;

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
// app.use("/api/users", userRouter);
// app.use("/api/auth", authRouter);
// app.use("./api/post", postRouter);
app.use(router);
app.use(secondRouter);
app.use(postRouter);
app.get("./users", (req, res) => {
  res.send("Welcome to Homepage");
});

app.listen(PORT, () => {
  console.log("Server is Ready!");
});
