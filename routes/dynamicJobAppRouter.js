const express = require("express");
const router = express.Router();
const { showIndexPage, action, candidateDetails, educationDetails, languageDetails, techDetails, experienceDetails,
preferenceDetails, refDetails } = require('../controllers/dynamicJobAppController');

router.get('/ajax_form', showIndexPage);
router.get('/action', action);
router.get('/candidate', candidateDetails);
router.get('/edu', educationDetails);
router.get('/lang_detail', languageDetails);
router.get('/tech_detail', techDetails);
router.get('/exp_detail', experienceDetails);
router.get('/pref_detail',preferenceDetails);
router.get('/ref_detail',refDetails);

app.get('/ref_detail', (req, res) => {
   
});
module.exports = router;