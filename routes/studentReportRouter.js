const express = require('express');
const router = express.Router();
const { showStudentDetail, showDetail, attendDetail } = require('../controllers/studentReportController');
router.get('/report', showStudentDetail);
router.get('/detail', showDetail);
router.get('/attend', attendDetail);
module.exports = router;