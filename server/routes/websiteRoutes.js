const express = require("express");
const router = express.Router();
const {
  getAllWebsites,
  addWebsite,
  updateWebsite,
  removeWebsite,
} = require("../controller/websiteControllers");

router.get("/", getAllWebsites);
router.post("/", addWebsite);
router.patch("/:id", updateWebsite);
router.delete("/:id", removeWebsite);

module.exports = router;
