const express = require("express");
const router = express.Router();
const herotext = require('../Controller/HeroController')
// const auth = require('../MiddleWare/Auth')

router.get("/hero-text", herotext.getHeroText);
router.put("/hero-text", herotext.updateHeroText);
router.post('/hero-text',  herotext.gettingdata)
router.delete('/hero-text',  herotext.delete)

module.exports = router;
