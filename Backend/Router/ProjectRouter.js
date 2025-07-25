const express = require("express");
const router = express.Router();
const projectcontroller = require("../Controller/ProjectController");


router.get("/getproject", projectcontroller.getProjects);
router.post("/addproject", projectcontroller.addProject);

module.exports = router;
