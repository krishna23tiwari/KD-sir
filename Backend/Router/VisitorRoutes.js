const express = require("express");
const router = express.Router();
const visitor = require("../Controller/VisitorController");
const auth = require('../MiddleWare/Auth')

router.post("/track",auth, visitor.trackVisitor);

router.get('/test', visitor.test)

router.get('/counts',auth, visitor.getCounts);

module.exports = router;
