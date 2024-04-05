const express = require("express");
const router = express.Router();
const { showIndexPage, action, candidateDetails, educationDetails, languageDetails, techDetails, experienceDetails,
    preferenceDetails, refDetails, prefDetailPrev, expDetailPrev, techDetailPrev, langDetailPrev, eduDetailPrev,
    canDetailPrev, updateLink, usersList, updateCandidateDetails } = require('../controllers/dynamicJobAppController');
const { findById, findAll } = require("../models/sql_function");


router.get('/ajax_form', showIndexPage);
router.get('/action', action);
router.get('/candidate', candidateDetails);
router.get('/edu', educationDetails);
router.get('/lang_detail', languageDetails);
router.get('/tech_detail', techDetails);
router.get('/exp_detail', experienceDetails);
router.get('/pref_detail', preferenceDetails);
router.get('/ref_detail', refDetails);
router.get('/pref_detail_pre', prefDetailPrev);
router.get('/exp_detail_prev', expDetailPrev);
router.get('/tech_detail_prev', techDetailPrev);
router.get('/lang_detail_Prev', langDetailPrev);
router.get('/edu_detail_prev', eduDetailPrev);
router.get('/can_detail_prev', canDetailPrev);
router.get('/update_link', updateLink);
router.get('/ajax_form_list', usersList);
router.get('/update_candidate', updateCandidateDetails);

module.exports = router;