const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const movieSchema = new mongoose.Schema(
  {
    imDbId: { ...reqString, unique: true },
    image: String,
    title: reqString,
    year: reqString,
    type: String, //Movie || TV Series
    imDb: Number,
    genres: Array,
    source: String, //Netflix || Amazon Prime
    sourceUrl: String,
    watchQueue: Number,
    watched: Boolean,
    rewatchScore: Number,
  },
  { timestamps: true, versionKey: false }
);

const Movie = mongoose.model("movies", movieSchema);
module.exports = Movie;
