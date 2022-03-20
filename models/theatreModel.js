const mongoose = require("mongoose");
const { Schema } = mongoose;

const TheatreSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    films: [{ type: Schema.Types.ObjectId, ref: "Film" }],
    shows: [{ type: Schema.Types.ObjectId, ref: "Show" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Theatre", TheatreSchema);
