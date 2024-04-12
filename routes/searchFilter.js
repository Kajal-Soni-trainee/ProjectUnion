const express = require('express');
const router = express.Router();
const { generateQuery } = require('../controllers/searchFilterController');

router.get("/search_filter", (req, res) => {
    res.render('search_filter_view/index1');
});
router.get('/data', generateQuery);
module.exports = router;

