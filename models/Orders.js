const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  datePlaced: Date,
  phone: String,
  fullfilled: { type: Boolean, default: false },
  photos: String,
  note: String,
  paid: { type: Boolean, default: false }
});

mongoose.model("orders", orderSchema);
