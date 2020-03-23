const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const keys = require("./config/keys");
require("./models/Orders");
require("./models/Photos");

mongoose.connect(keys.mongoURI);

const app = express();
app.use(bodyParser.json()); // might be causing a problem
app.use(cookieParser());

require("./routes/photos")(app);
require("./routes/orders")(app);
require("./routes/adminLogin")(app);

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
