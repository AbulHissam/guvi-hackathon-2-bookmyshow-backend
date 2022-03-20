const asyncHandler = require("express-async-handler");
const Theatre = require("../models/theatreModel");

const { createShows } = require("../scripts/createShows");

const createTheatre = asyncHandler(async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("name is missing");
  }

  const theatreExists = await Theatre.findOne({ name });

  if (theatreExists) {
    res.status(400);
    throw new Error(`theatre already exists with name:${name}`);
  }

  const theatre = await Theatre.create({
    name,
  });

  if (!theatre) {
    res.status(400);
    throw new Error("error creating a theatre");
  }

  // createShows for this theatre
  await createShows(theatre._id);

  const findTheatre = await Theatre.findById(theatre._id).populate("shows");

  res.status(200).json(findTheatre);
});

const updateTheatre = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const payload = req.body;

  if (!payload) throw new Error("payload is missing");

  const updatedTheatre = await Theatre.findByIdAndUpdate({ _id: id }, payload);

  res.status(200).json(updatedTheatre);
});

const fetchTheatres = asyncHandler(async (req, res, next) => {
  const theatres = await Theatre.find({})
    .populate("films", "name")
    .populate("shows", "name time");
  res.status(200).json(theatres);
});
const fetchShowsForTheatre = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id) throw new Error("id is missing");

  let theatre = await Theatre.findById(id).populate("shows");

  const shows = theatre.shows;

  res.status(200).send(shows);
});

const deleteTheatre = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  await Theatre.deleteOne({ _id: id });

  res.sendStatus(200);
});

module.exports = {
  createTheatre,
  updateTheatre,
  fetchTheatres,
  deleteTheatre,
  fetchShowsForTheatre,
};
