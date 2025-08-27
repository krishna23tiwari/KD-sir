const express = require("express");
const router = express.Router();
const controller = require("../Controller/AboutController");
// const auth = require("../MiddleWare/Auth");

router.post('/saveintro', controller.saveintro)
router.get('/showintro', controller.showintro)
router.put('/editintro/:id', controller.editintro)

module.exports = router;
