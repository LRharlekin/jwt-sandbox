require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

// const connectDB = require("./db/connect");

const mainRouter = require("./routes/main");
const notFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");

// pre-hook middlewares
app.use(express.static("./public"));
app.use(express.json());

// routes
// app.get("/", (req, res) => {
//   res.status(200).json({ success: true, msg: "Hello worldddd." });
// });
app.use("/api/v1", mainRouter);

// post-hook middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    // await connectDB(process.env.MONGO_URI);
    // console.log("Connected to DB ! !");
    app.listen(port, () => {
      console.log(`Listening on PORT: ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
