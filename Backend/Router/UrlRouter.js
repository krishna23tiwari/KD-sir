const express = require("express");
const router = express.Router();
const url = require("../Controller/UrlController");
const auth = require("../MiddleWare/Auth"); 

router.get("/", url.getUrl);                 
router.put("/", auth, url.updateUrl); 

module.exports = router;
