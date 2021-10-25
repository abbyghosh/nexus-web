const express = require("express");
const router = express.Router();
const { getAllSources } = require("../controller/sourceControllers");

router.get("/", getAllSources);

module.exports = router;
