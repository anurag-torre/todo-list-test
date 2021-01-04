const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("./config/dbConfig");
const mainController = require("./controller/mainController");

const app = express();
app.use(cors());

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", mainController);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
