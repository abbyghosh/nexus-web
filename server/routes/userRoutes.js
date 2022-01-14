const express = require("express");
const router = express.Router();

const { handleNewUser, handleLogin, getAllUsers } = require("../controller/userControllers");

router.post("/register", handleNewUser);
router.post("/login", handleLogin);
router.get("/", getAllUsers);

module.exports = router;
