const express = require('express');
const router = express.Router();
const { generateQuery } = require('../controllers/searchFilterController');

router.get("/", (req, res) => {
    res.render('index1');
});

router.get('/data', generateQuery);

module.exports = router;

