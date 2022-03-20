const mongoose = require("mongoose");
const { Schema } = mongoose;

const ShowSchema = new Schema({
  theatre: { type: Schema.Types.ObjectId, ref: "Theatre" },
  name: { type: String, required: true },
  time: { type: String, required: true },
  // isAlloted: { type: Boolean, default: false },
  // seats: [{ type: Schema.Types.ObjectId, ref: "Seat" }],
});

module.exports = mongoose.model("Show", ShowSchema);
