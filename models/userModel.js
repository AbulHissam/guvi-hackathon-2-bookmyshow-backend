const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Before saving a document run this to hash the password
UserSchema.pre("save", async function (next) {
  const user = this;

  // only hash the password if it is modified or new
  if (!user.isNew || !user.isModified("password")) {
    // return by handling the control next middleware
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

// We may also define our own custom document instance methods.
// assign a function to the "methods" object of our userSchem
// this is a method to check entered password and hashed password of a user
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
