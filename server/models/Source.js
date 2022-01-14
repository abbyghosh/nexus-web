const mongoose = require("mongoose");
const { reqString } = require("../utils/constants");

const sourceSchema = new mongoose.Schema(
  {
    name: reqString,
  },
  { timestamps: true, versionKey: false }
);

const Source = mongoose.model("source", sourceSchema);
module.exports = Source;
