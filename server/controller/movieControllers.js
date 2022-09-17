const Movie = require("../models/Movie");

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.json({ data: movies });
  } catch (err) {
    console.error(err.message);
    if (err.name === "MongoError" && err.code === 11000) {
      res.status(500).json({ message: "Duplicate entry" });
    }
  }
};

const addMovie = async (req, res) => {
  try {
    const movie = await new Movie(req.body).save();
    res.json({ message: "Movie successfully added.", data: movie });
  } catch (err) {
    console.error({ ...err });

    if (err.code === 11000) {
      res.status(409).json({ message: "Movie/Series already exists." });
    }
    res.status(400).json({ message: err.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    let body = req.body;
    const movie = await Movie.findByIdAndUpdate(req.params.id, body);
    res.send({ message: "Movie successfully updated.", data: { ...movie._doc, ...body } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const removeMovie = async (req, res) => {
  try {
    console.log("Entered", req.params.id, req.body);
    const movie = await Movie.findByIdAndDelete(req.params.id);
    res.send({ message: "Movie successfully deleted." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllMovies, addMovie, updateMovie, removeMovie };
