const express = require('express')
const router = express.Router()
const experienceController = require('../Controller/ExperienceController')

router.get('/getexperience', experienceController.getExperiences)
router.post('/saveexperience', experienceController.addExperience)
router.put('/updateex/:id', experienceController.updateExperience)
router.delete('/deleteex/:id', experienceController.deleteExperience)

module.exports = router;