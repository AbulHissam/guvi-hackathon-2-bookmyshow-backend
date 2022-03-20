const asyncHandler = require("express-async-handler");
const Film = require("../models/filmModel");
const Theatre = require("../models/theatreModel");

const createFilm = asyncHandler(async (req, res, next) => {
  const { name } = req.body;

  if (!name) throw new Error("name is missing");

  const filmExists = await Film.findOne({ name });

  if (filmExists) throw new Error("film already exists");

  const film = await Film.create({ name });

  res.status(201).json({
    id: film._id,
    name: film.name,
  });
});

const assignFilm = asyncHandler(async (req, res, next) => {
  const { filmId, theatreId, showId } = req.body;

  if (!filmId || !theatreId || !showId) {
    res.status(400);
    throw new Error("filmId or theatreId or showId is missing");
  }

  const theatre = await Theatre.findById(theatreId);
  const film = await Film.findById(filmId);

  if (!theatre || !film) {
    res.status(400);
    throw new Error("invalid theatre or film");
  }

  if (theatre.films.includes(filmId)) {
    res.status(400);
    throw new Error("film is already assigned to this theatre");
  }

  // find films for the theatre from payload
  const films = await Film.find({ theatre: theatreId });

  // find if any films has already have show sent from payload
  if (films.find((f) => f.show.toString() === showId)) {
    res.status(400);
    throw new Error("Show already assigned");
  }

  // include the film from payload list of films for theatre
  const updatedFilmsForTheatre = [...theatre.films, film._id];

  // update theatre
  await Theatre.findByIdAndUpdate(theatreId, {
    films: updatedFilmsForTheatre,
  });

  // update film with showId,theatreId
  await Film.findByIdAndUpdate(filmId, { theatre: theatreId, show: showId });

  res.sendStatus(200);
});

const fetchFilms = asyncHandler(async (req, res, next) => {
  const films = await Film.find({})
    .populate("theatre", "name")
    .populate("show", "name time");
  res.status(200).json(films);
});

const fetchFilmsByTheatre = asyncHandler(async (req, res, next) => {
  const { theatreId } = req.params;
  if (!theatreId) {
    res.status(200);
    throw new Error("theatreId is missing");
  }
  const films = await Film.find({ theatre: theatreId }).populate(
    "show",
    "name time"
  );
  res.status(200).json(films);
});

module.exports = { createFilm, assignFilm, fetchFilms, fetchFilmsByTheatre };
