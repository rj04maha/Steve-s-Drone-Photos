const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//require("express-async-errors");
//const winston = require("winston");
//const error = require("./middlewares/error");
const keys = require("./config/keys");
require("./models/Orders");
require("./models/Photos");

//winston.add(winston.transports.File, { filename: "logfile.log" });

mongoose.connect(keys.mongoURI);

const app = express();
app.use(bodyParser.json());
//app.use(express.json());
//app.use(express.urlencoded());

require("./routes/photos")(app);
require("./routes/orders")(app);

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  app.use(express.static("client/build"));
  // Express will serve up index.html file if it doesn't recognize route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);
