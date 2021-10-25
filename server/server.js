require("dotenv").config();
const express = require("express");
const path = require("path");

const connectDB = require("./config/db");
const movieRoutes = require("./routes/movieRoutes");
const sourceRoutes = require("./routes/sourceRoutes");

const PORT = process.env.PORT || 4001;

const app = express();
connectDB();

if (process.env.NODE_ENV !== "production") {
  var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  };
  app.use(allowCrossDomain);
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/movies", movieRoutes);
app.use("/api/sources", sourceRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  /*   app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  }); */
}
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
