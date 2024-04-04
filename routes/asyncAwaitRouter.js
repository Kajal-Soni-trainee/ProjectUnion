const express = require('express');
const router = express.Router();

router.get('/json_placeholder', (req, res) => {
    res.render('async_await_prac_views/index');
    res.end();
});
router.get('/comments', (req, res) => {
    let id = req.query.id;
    res.render('async_await_prac_views/comments', { id: id });
});

module.exports = router;