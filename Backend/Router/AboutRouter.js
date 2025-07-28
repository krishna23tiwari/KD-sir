const express = require("express");
const router = express.Router();
const controller = require("../Controller/AboutController");
const auth = require("../MiddleWare/Auth");

router.get("/", auth, controller.getAboutInfo);
router.put("/", auth, controller.createOrUpdateAbout);

module.exports = router;
