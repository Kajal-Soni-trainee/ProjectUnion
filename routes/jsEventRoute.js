const express = require('express');
const router = express.Router();
router.get('/events', (req, res) => {
    res.render('event_table');
    res.end();
});
module.exports = router;