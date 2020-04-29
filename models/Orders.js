const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  addr1: String,
  addr2: String,
  city: String,
  state: String,
  zip: String,
  payment: { type: String, required: true },
  datePlaced: Date,
  photos: { type: Schema.Types.Mixed, required: true }, // change this to object or something else
  customerNote: String,
  total: { type: Number, required: true },
  //adminNote: String,
  //paid: { type: Boolean, default: false },
  //fullfilled: { type: Boolean, default: false },
});

mongoose.model("orders", orderSchema);
