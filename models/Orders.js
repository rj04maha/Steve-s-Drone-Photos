const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String
});

mongoose.model("orders", orderSchema);
