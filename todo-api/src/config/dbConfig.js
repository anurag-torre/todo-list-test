const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/torre",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err, results) => {
    if (err) console.log(err);
  }
);

mongoose.Promise = global.Promise;
