const mongoose = require("mongoose");
const { Schema } = mongoose;

const FilmSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  theatre: {
    type: Schema.Types.ObjectId,
    ref: "Theatre",
  },
  show: {
    type: Schema.Types.ObjectId,
    ref: "Show",
    unique: true,
  },
});

module.exports = mongoose.model("Film", FilmSchema);
