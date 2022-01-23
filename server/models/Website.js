const mongoose = require("mongoose");

const { reqString } = require("../utils/constants");

const websiteSchema = new mongoose.Schema(
  {
    name: reqString,
    url: reqString,
    description: reqString,
    tags: [reqString],
    displayOrder: { type: Number }, // To prioritize websites --> 1 has the most priority and should be display at the top
  },
  { timestamps: true, versionKey: false }
);

const Website = mongoose.model("website", websiteSchema);
module.exports = Website;
