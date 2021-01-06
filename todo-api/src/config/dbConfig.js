const mongoose = require("mongoose");
const mongoConnectionString =
  process.env.DB_URL || "mongodb://localhost:27017/torre";

mongoose.connect(
  mongoConnectionString,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err, results) => {
    if (err) console.log(err);
  }
);

mongoose.Promise = global.Promise;
