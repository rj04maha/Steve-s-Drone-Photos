const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  address: String,
  datePlaced: Date,
  fullfilled: { type: Boolean, default: false },
  photos: { type: String, required: true }, // change this to object or something else
  customerNote: String,
  adminNote: String,
  paid: { type: Boolean, default: false }
});

mongoose.model("orders", orderSchema);
