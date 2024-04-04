const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/jobAppFormCOntroller/registerUser');
const { displayList, displayUpdatePage } = require('../controllers/jobAppFormCOntroller/listController');
const { updateUser } = require('../controllers/jobAppFormCOntroller/updateUser');
router.get('/job_app_form', (req, res) => {
    res.render('job_app_form_view/index', { dataObj: "", errorObj: "", isError: false, isUpdate: false, can: "", exp: "", edu: "", lang: "", tech: "", ref: "", pref: "" });
    res.end();
});

router.post('/job_app_form', registerUser);
router.get('/job_app_form_list', displayList);
router.get('/update', displayUpdatePage);
router.post('/updated', updateUser);
module.exports = router;