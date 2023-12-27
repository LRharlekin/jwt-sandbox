require("dotenv").config();

const express = require("express");
const app = express();

const connectDB = require("./db/connect");

// pre-hook middlewares
app.use(express.json());
app.use(express.static("./public"));

// routes
app.get("/", (req, res) => {
  res.status(200).json({ success: true, msg: "Hello world." });
});

// post-hook middlewares

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    // start db
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to DB ! !");
    app.listen(port, console.log(`Listening on PORT: ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
