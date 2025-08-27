const express = require("express");
const router = express.Router();
const UserController = require("../Controller/UserController");

router.post("/register", UserController.register);

router.post("/login", UserController.login);

router.put('/resumelink', UserController.updateResumeLink)

router.get('/getResume', UserController.getResume);


module.exports = router;
