const express = require('express');
const router = express.Router();
router.get('/dynamic_cube', (req, res) => {
    res.render('assign1');
    res.end();
});
module.exports = router;