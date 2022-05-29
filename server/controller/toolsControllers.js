const Website = require("../models/Tools");

const getAllWebsites = async (req, res) => {
  try {
    const websites = await Website.find();
    res.json({ result: websites });
  } catch (err) {
    console.error(err.message);
    if (err.name === "MongoError" && err.code === 11000) {
      res.status(500).json({ message: "Duplicate entry" });
    }
  }
};

const addWebsite = async (req, res) => {
  try {
    const website = await new Website(req.body).save();
    res.json({ message: "Website successfully added.", result: website });
  } catch (err) {
    console.error({ ...err });

    if (err.code === 11000) {
      res.status(409).json({ message: "Website/Series already exists." });
    }
    res.status(400).json({ message: err.message });
  }
};

const updateWebsite = async (req, res) => {
  try {
    let body = req.body;
    const website = await Website.findByIdAndUpdate(req.params.id, body);
    res.send({ message: "Website successfully updated.", result: { ...website._doc, ...body } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const removeWebsite = async (req, res) => {
  try {
    console.log("Entered", req.params.id, req.body);
    const website = await Website.findByIdAndDelete(req.params.id);
    res.send({ message: "Website successfully deleted." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllWebsites, addWebsite, updateWebsite, removeWebsite };
