const express = require('express');
const router = express.Router();

router.get('/tic_tac_toe', (req, res) => {
    res.render('assignment3_tic-tac-toe');
    res.end();
 });
 
module.exports = router;
