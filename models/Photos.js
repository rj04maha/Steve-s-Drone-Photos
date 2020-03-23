const mongoose = require("mongoose");
const { Schema } = mongoose;

const photoSchema = new Schema({
  name: { type: String, required: true },
  tags: [String],
  description: { type: String, required: true },
  source: { type: String, required: true },
  dateAdded: Date
});

mongoose.model("photos", photoSchema);
