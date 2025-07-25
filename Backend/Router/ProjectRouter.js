const express = require("express");
const router = express.Router();
const projectcontroller = require("../Controller/ProjectController");


router.get("/getproject", projectcontroller.getProjects);

router.post("/addproject", projectcontroller.addProject);

router.put('/update/:id', projectcontroller.update)

router.delete('/delete/:id', projectcontroller.delete)

module.exports = router;
