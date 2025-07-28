const express = require("express");
const router = express.Router();
const visitor = require("../Controller/VisitorController");

router.post("/track", visitor.trackVisitor);

router.get('/test', visitor.test)

router.get('/counts', visitor.getCounts);

module.exports = router;
