const express = require('express');
const router = express.Router();
router.get('/sorting', (req, res) => {
    res.render('sorting_in_js');
    res.end();
});
module.exports = router;