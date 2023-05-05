//requires
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const { auth } = require("firebase-admin");
const { readdirSync } = require("fs");

require("dotenv").config();

// app
const app = express();
app.use(cors());
//db
const mongooseConnect = () => {
  let connecting = setTimeout(() => console.log("Connecting to DB..."), 1000);
  mongoose
    .connect("mongodb://0.0.0.0:27017/ecom", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      clearTimeout(connecting);
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.log(err.toString());
      clearTimeout(connecting);
      console.log("Unable to connect to DB");
      console.log("Retrying in 10 seconds");
      setTimeout(mongooseConnect, 10 * 1000);
    });
};
mongooseConnect();

// Middleware
app.use(morgan("dev")); // :method :url :status :response-time ms :res[content-length]
app.use(bodyParser.json({ limit: "2mb" }));

//route middleware
// if multiple routes used
readdirSync("./routes").map((r) => app.use(require("./routes/" + r)));

// Local Single Route
app.get("/user-2", (req, res) => {
  res.send(`<h3> User 2 </h3>`);
});

//port
const port = 2001;

app.listen(port, () => console.log(`Server is Running on Port ${port}`));
