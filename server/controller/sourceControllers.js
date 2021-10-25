const Source = require("../models/Source");

const getAllSources = async (req, res) => {
  try {
    const sources = await Source.find({});
    res.json({ data: sources });
  } catch (err) {
    console.error(err.message);
    if (err.name === "MongoError" && error.code === 11000) {
      res.status(500).json({ message: "Duplicate entry" });
    }
  }
};

module.exports = { getAllSources };
