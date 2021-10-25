const express = require("express");
const router = express.Router();
const {
  getAllMovies,
  addMovie,
  updateMovie,
  removeMovie,
} = require("../controller/movieControllers");

router.get("/", getAllMovies);
router.post("/", addMovie);
router.patch("/:id", updateMovie);
router.delete("/:id", removeMovie);

module.exports = router;
