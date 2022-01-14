const mongoose = require("mongoose");

const { reqString } = require("../utils/constants");

const userSchema = new mongoose.Schema(
  {
    name: reqString,
    email: reqString,
    password: reqString,
    isAdmin: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
