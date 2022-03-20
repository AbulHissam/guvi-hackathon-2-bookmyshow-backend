const express = require("express");
const {
  createFilm,
  assignFilm,
  fetchFilms,
  fetchFilmsByTheatre,
} = require("../controllers/filmControllers");
const { requireAdmin, verifyToken } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/").post(requireAdmin, createFilm);
router.route("/assignToTheatre").put(requireAdmin, assignFilm);
router.route("/").get(verifyToken, fetchFilms);
router.route("/:theatreId").get(verifyToken, fetchFilmsByTheatre);

module.exports = router;
