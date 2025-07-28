const express = require("express");
const router = express.Router();
const herotext = require('../Controller/HeroController')
const auth = require('../MiddleWare/Auth')

router.get("/hero-text",auth, herotext.getHeroText);
router.put("/hero-text",auth, herotext.updateHeroText);
router.post('/hero-text', auth, herotext.gettingdata)
router.delete('/hero-text', auth, herotext.delete)

module.exports = router;
