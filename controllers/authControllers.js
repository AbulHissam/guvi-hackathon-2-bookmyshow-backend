const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const User = require("../models/userModel");

const handleSignup = asyncHandler(async (req, res, next) => {
  const { name, email, password, isAdmin } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("name or email or password is missing");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("user already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    isAdmin,
  });

  if (!user) throw new Error("failed to create user");

  res.status(201).json({
    id: user._id,
    name,
    email,
    isAdmin: user.isAdmin,
    token: generateToken({ userId: user._id, isAdmin: user.isAdmin }),
  });
});

const handleLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("email or password is missing");
  }

  const user = await User.findOne({ email });

  const passwordMatches = await user.comparePassword(password);

  if (user && passwordMatches) {
    res.status(200).json({
      id: user._id,
      email,
      isAdmin: user.isAdmin,
      token: generateToken({ userId: user._id, isAdmin: user.isAdmin }),
    });
  } else {
    res.status(400);
    throw new Error("invalid credentials");
  }
});

module.exports = { handleSignup, handleLogin };
