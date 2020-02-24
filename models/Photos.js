const mongoose = require("mongoose");
const { Schema } = mongoose;

const photoSchema = new Schema({
  id: Number,
  source: String,
  tags: [String],
  dateAdded: Date
});

mongoose.model("photos", photoSchema);
