const { showStudentDetails, ascStudentDetail, descStudentDetail } = require("../models/paginationSql");

const pagination = async (req, res) => {
    if (req.query.sort == undefined) {
        console.log("sort not defined");
        if (req.query.id == undefined) {
            id = 1;
        }
        else {
            id = parseInt(req.query.id);
        }
        let startIndex = (id - 1) * 250;
        let lastIndex = (req.query.id) * 250;
        let data = await showStudentDetails(startIndex);
        if (data.length > 0) {
            let myobj = { mydata: data, id: id };
            res.render('listing_views/list', { obj: myobj });
            res.end();
        }

    }

    if (req.query.sort !== undefined) {
        if (req.query.sort == "asc") {
            console.log("ascending clicked!");
            if (req.query.id == undefined) {
                id = 1;
            }
            else {
                id = parseInt(req.query.id);
            }
            let startIndex = (id - 1) * 250;
            let lastIndex = (req.query.id) * 250;

            let data = await ascStudentDetail(startIndex);
            if (data.length > 0) {
                let myobj = { mydata: data, id: id };
                res.render('listing_views/list', { obj: myobj });
                res.end();
            }


        }
        else if (req.query.sort == "desc") {
            console.log("descing clicked!");
            if (req.query.id == undefined) {
                id = 1;
            }
            else {
                id = parseInt(req.query.id);
            }
            let startIndex = (id - 1) * 250;
            let lastIndex = (req.query.id) * 250;
            let data = await descStudentDetail(startIndex);
            if (data.length > 0) {
                let myobj = { mydata: data, id: id };
                res.render('listing_views/list', { obj: myobj });
                res.end();
            }
        }
    }
}

module.exports = { pagination };