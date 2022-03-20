const mongoose = require("mongoose");
const { Schema } = mongoose;

const SeatSchema = new Schema({
  show: { type: Schema.Types.ObjectId, ref: "Show" },
  row: String,
  col: String,
});

const PreBookSeatSchema = new Schema({
  showId: { type: Schema.Types.ObjectId, ref: "Show" },
  seatId: { type: Schema.Types.ObjectId, ref: "Seat" },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

const Seat = mongoose.model("Seat", SeatSchema);
const PreBookSeat = mongoose.model("PreBookSeat", PreBookSeatSchema);

module.exports = { Seat, PreBookSeat };
