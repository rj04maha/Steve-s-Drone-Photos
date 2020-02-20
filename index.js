const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const app = express();
require("./models/Orders");

mongoose.connect(keys.mongoURI);

app.get("/", (req, res) => {
  res.send({ hi: "thereeee" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);
