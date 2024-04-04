const express = require("express");
const router = express.Router();
const {pagination} = require('../controllers/paginationController');
var id;
router.get("/pagi", pagination);

module.exports = router;