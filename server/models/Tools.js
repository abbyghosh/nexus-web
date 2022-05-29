const mongoose = require("mongoose");

const { reqString } = require("../utils/constants");

const toolSchema = new mongoose.Schema(
  {
    name: reqString,
    url: reqString,
    description: reqString,
    tags: [reqString],
    displayOrder: { type: Number }, // To prioritize tools --> 1 has the most priority and should be display at the top
  },
  { timestamps: true, versionKey: false }
);

const Tools = mongoose.model("tool", toolSchema);
module.exports = Tools;
