const express = require("express");
const router = express.Router();

const { verifyToken, requireAdmin } = require("../middlewares/authMiddleware");
const {
  createTheatre,
  updateTheatre,
  fetchTheatres,
  deleteTheatre,
  fetchShowsForTheatre,
} = require("../controllers/theatreControllers");

router.route("/").post(requireAdmin, createTheatre);
router.route("/:id").put(requireAdmin, updateTheatre);
router.route("/:id").delete(requireAdmin, deleteTheatre);
router.route("/").get(verifyToken, fetchTheatres);
router.route("/shows/:id").get(verifyToken, fetchShowsForTheatre);

module.exports = router;
