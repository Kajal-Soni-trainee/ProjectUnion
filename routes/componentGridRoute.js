const express = require('express');
const router = express.Router();
const { grid, dataList, sortById, filterData } = require('../controllers/componentGridRoute');
const { sql_filter_limit } = require('../models/componentGridSql');

var isPagination = false;
var isFilter = false;
var idSelected = false;

router.get("/grid", (req, res) => {
    res.render("component_grid_view/index", { isPagi: false, showData: false, result: "", pagination: "pagination", tables: "tables", id: 1, limit: 0, pages: 0, query: "", order: "", element: "", filter: false, obj: "" });
    res.end();
});

router.post("/grid", grid);
router.get('/data', dataList);
router.post('/id', sortById);
router.get('/filter_data', filterData);

module.exports = router;