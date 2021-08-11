const express = require("express");
const app = express();

const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const path = require("path");

global.__basedir = __dirname;

const errorMiddleware = require("./middlewares/errors");

// setting up config file
if (process.env.NODE_ENV !== "PRODUCTION")
  require("dotenv").config({ path: "backend/config/config.env" });

// Parsers for POST data
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: false, limit: "20mb" }));
app.use(cookieParser());

// import all the routes
const properties = require("./routes/property");
const auth = require("./routes/auth");
const list = require("./routes/list");

app.use(express.static(`${__dirname}/public`));

app.use("/api/v1", properties);
app.use("/api/v1", auth);
app.use("/api/v1", list);

if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });
}

// middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
