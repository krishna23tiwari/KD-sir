const express = require("express");
const router = express.Router();
const visitor = require("../Controller/VisitorController");

router.post("/track", visitor.trackVisitor);

module.exports = router;
