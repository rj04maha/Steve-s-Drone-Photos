const mongoose = require("mongoose");
const { Schema } = mongoose;

const photoSchema = new Schema({
  name: { type: String, required: true },
  tags: [String],
  source: { type: String, required: true },
  location: { type: String, required: true },
  dateTaken: { type: String, required: true },
  dateAdded: Date
});

mongoose.model("photos", photoSchema);
