const express = require("express");
const router = express.Router();
const visitor = require("../Controller/VisitorController");

router.get("/track", visitor.trackVisitor);

module.exports = router;
