const express = require("express");
const router = express.Router();
const controller = require("../Controller/AboutController");
// const auth = require("../MiddleWare/Auth");

router.get("/",  controller.getAboutInfo);
router.put("/",  controller.createOrUpdateAbout);

module.exports = router;
