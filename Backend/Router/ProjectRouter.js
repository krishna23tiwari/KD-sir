const express = require("express");
const router = express.Router();
const projectcontroller = require("../Controller/ProjectController");
const auth = require('../MiddleWare/Auth')


router.get("/getproject",auth, projectcontroller.getProjects);

router.post("/addproject",auth, projectcontroller.addProject);

router.put('/update/:id',auth, projectcontroller.update)

router.delete('/delete/:id',auth, projectcontroller.delete)

module.exports = router;
