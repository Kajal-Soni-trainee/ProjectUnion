const express= require('express');
 const router = express.Router();
  
router.get('/kuku_cube', (req, res) => {
    res.render('assign2_game');
    res.end();
 });
module.exports = router;