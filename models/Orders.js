const mongoose = require("mongoose");
const { Schema } = mongoose;
//const Photos = require("Photos");

const orderSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  date: Date,
  fullfilled: { type: Boolean, default: false },
  photos: String,
  note: String
});

mongoose.model("orders", orderSchema);
