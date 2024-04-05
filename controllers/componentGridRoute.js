const conn = require('../mysql');

const { sql_function } = require('../Projects/component_grid/middleware');
const { sql_limit, sql_Orderby, sql_filters, sql_filter_limit, sql_id } = require('../models/componentGridSql');

const grid = async (req, res) => {
    let isFilter = false;
    if (!isFilter) {
        isFilter = true;
        console.log(req.method);
        console.log(req.body);
        var query = req.body.query;
        let myquery = query;
        let sql_result;
        console.log(query);
        let result = await sql_function(query, conn);
        if (result.length > 0) {
            let len = result.length;
            let keys = Object.keys(result[0]);
            let element = keys[0];
            let order = "asc";
            let max = 20;
            if (len < max) {
                let result = await sql_Orderby(query, element, order, conn);
                // console.log(result);
                if (result.length > 0) {
                    res.render("component_grid_view/index", { isPagi: false, showData: true, result: result, pagination: "pagination", tables: "tables", id: 1, limit: 0, pages: 0, query: query, order: order, element: element, filter: false, obj: "" });
                    res.end();
                }
            }
            else {
                isPagination = true;
                let pages = Math.ceil(len / max);
                let result = await sql_limit(query, 1, max, element, order, conn);
                // console.log(result);
                res.render("component_grid_view/index", { isPagi: true, showData: true, result: result, pagination: "pagination", tables: "tables", id: 1, limit: max, pages: pages, query: query, order: order, element: element, filter: false, obj: "" });
                res.end();
            }
        }
    }
    else {

        console.log(req.body);
        // let keys = Object.keys(req.body); 
        let query = req.body.query;
        let element = req.body.element;
        let order = req.body.order;
        //let values=Object.values(req.body);

        const obj = [];
        obj.push(req.body);
        console.log(obj);
        let result = await sql_filters(query, conn, element, order, obj);
        let len = result.length;
        let limit = 20;
        if (len < limit) {
            console.log(obj);
            res.render("component_grid_view/index", { isPagi: false, showData: true, result: result, pagination: "pagination", tables: "tables", id: 1, limit: 0, pages: 0, query: query, order: order, element: element, filter: true, obj: obj });
            res.end();
        }
        else {
            pages = Math.ceil(len / limit);
            let result = await sql_filter_limit(query, 1, limit, element, order, conn, obj);
            res.render("component_grid_view/index", { isPagi: true, showData: true, result: result, pagination: "pagination", tables: "tables", id: 1, limit: limit, pages: pages, query: query, order: order, element: element, filter: true, obj: obj });
            res.end();

            functions.sql_filter_limit(query, 1, limit, element, order, conn, obj).then((result) => {
                console.log(obj);

            }).catch((err) => {
                console.log(err);
            });
        }
        isFilter = false;
    }
}

const dataList = async (req, res) => {
    let id = parseInt(req.query.id);
    let query = req.query.query;
    let limit = req.query.limit;
    let pages = req.query.pages;
    let order = req.query.order;
    let element = req.query.element;
    let result = await sql_limit(query, id, limit, element, order, conn);
    res.render("component_grid_view/index", { isPagi: true, showData: true, result: result, pagination: "pagination", tables: "tables", id: id, limit: limit, pages: pages, query: query, order: order, element: element, filter: false, obj: "" });
    res.end();
}

const sortById = async (req, res) => {
    let query = req.body.query;
    console.log("querty" + query);
    if (query != '') {
        let id = Object.keys(req.body)[0];
        let value = Object.values(req.body)[0];
        let result = await sql_id(query, id, value, conn);
        if (result.length > 0) {
            res.render("component_grid_view/index", { isPagi: false, showData: true, result: result, pagination: "pagination", tables: "tables", id: 1, limit: 0, pages: 0, query: query, order: "asc", element: id, filter: true, obj: "" });
            res.end();
        }
    }
}

const filterData = async (req, res) => {
    let id = (req.query.id);
    let limit = req.query.limit;
    let query = req.query.query;
    let element = req.query.element;
    let order = req.query.order;
    let pages = req.query.pages;
    let obj = req.query.obj;
    let result = req.query.result;
    try {
        let result = await sql_filter_limit(query, 1, limit, element.order, conn, obj);
        res.render("component_grid_view/index", { isPagi: true, showData: true, result: result, pagination: "pagination", tables: "tables", id: id, limit: limit, pages: pages, query: query, order: order, element: element, filter: true, obj: obj });
        res.end();
    }
    catch (err) {
        console.log(err);
    }
}
module.exports = { grid, dataList, sortById, filterData };