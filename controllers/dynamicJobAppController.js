const { insertCandidateDetails, insertEducationDetails, updateEducationDetails,
    insertLanguageDetails, updateLanguageDetails, insertExpDetails, updateExpDetails,
    insertTechDetails, updateTechDetails, insertPrefDetails, updatePrefDetails } = require('../models/dynamicJobAppSql');
const { findAll, findById } = require('../models/sql_function');
const path = require('path');
const fs = require('fs');
let filename = path.join(__dirname, 'views/dynamic_job_form_views');
const showIndexPage = async (req, res) => {
    console.log("data");
    let query = 'select * from states';
    let result = [];
    result.push(
        {
            first_name: "",
            last_name: "",
            design: "",
            current_addreess: "",
            permanent_address: "",
            email: "",
            phone: "",
            city: "",
            state: "",
            gender: "",
            zip_code: "",
            relationship_status: ""
        }
    );
    let result1 = await findAll('states');
    if (result1) {
        res.render('dynamic_job_form_views/index', { result: result, result1: result1, isUpdate: false });
        res.end();
    }
}


const action = async (req, res) => {
    let action = req.query.action;
    let id = parseInt(req.query.id);
    let table = req.query.table;
    let field = req.query.field;
    if (action == 'fetch') {
        try {
            let data = await findAll(table, field, id);
            res.json({ data: data });
        }
        catch (err) {
            console.log(err);
        }
    }
}

const candidateDetails = async (req, res) => {

    async function getUserId() {
        let userId = await insertCandidateDetails(req.query);
        fs.readFile(`${filename}/education_details.ejs`, 'utf-8', function (err, data) {
            if (err) throw err;
            res.json({ data: data, userId: userId });
        });
    }
    getUserId();
}

const educationDetails = async (req, res) => {
    let userId = req.query.userId;
    let course_type = req.query.course_type;
    course_type = course_type.split(',');
    let course_name = req.query.course_name;
    course_name = course_name.split(',');
    let school_name = req.query.school_name;
    school_name = school_name.split(',');
    let passing_year = req.query.passing_year;
    passing_year = passing_year.split(',');
    let percent = req.query.percent;
    percent = percent.split(',');
    console.log(course_type);
    console.log(course_name);
    console.log(school_name);
    console.log(passing_year);
    console.log(percent);
    let eduObj = [];
    let len = course_type.length;
    for (let i = 0; i < len; i++) {
        if (course_name[i] != "" && school_name[i] != "" && passing_year[i] != "" && percent[i] != "") {
            eduObj.push([course_type[i], passing_year[i], percent[i], course_name[i], school_name[i]]);
        }
    }
    try {
        let result = await findById('edu_master', 'candidate_id', userId);
        if (result.length > 0) {
            try {
                let insertResult = await insertEducationDetails(eduObj);
                if (insertResult != 0) {
                    console.log("successfully inserted");
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        else {
            try {
                let updateResult = await updateEducationDetails(eduObj);
                if (updateResult.length != 0) {
                    console.log("successfully updated");
                }
            }
            catch (err) {
                console.log(err);
            }
        }
    }
    catch (err) {
        console.log(err);
    }
    try {
        let result = findById('language_details', 'candidate_id', userId);
        fs.readFile(`${filename}/language_details.ejs`, 'utf-8', function (err, data) {
            if (err) throw err;
            res.json({ data: data, userId: userId, result: result });
        });
    }
    catch (err) {
        console.log(err)
    }
}

const languageDetails = async (req, res) => {
    let userId = req.query.userId;
    let lang = req.query.lang;
    lang = lang.split(',');
    let lhskill = req.query.lhskill;
    lhskill = lhskill.split(',');
    let leskill = req.query.leskill;
    leskill = leskill.split(',');
    let lgskill = req.query.lgskill;
    lgskill = lgskill.split(',');
    console.log(lang);
    console.log(lhskill);
    console.log(leskill);
    console.log(lgskill);
    let langObj = new Object();
    lang.forEach((element) => {
        if (element == 'hindi') {
            if (lhskill != undefined) {
                langObj.hindi = lhskill;
            }
        }
        else if (element == 'english') {
            if (leskill != undefined) {
                langObj.english = leskill;
            }
        }
        else {
            if (lgskill != undefined) {
                langObj.gujarati = lgskill;
            }
        }
    });
    console.log(langObj);
    try {
        let result = await findById('language_details', 'candidate_id', userId);
        if (result.length > 0) {
            try {
                let insertResult = await insertLanguageDetails(langObj);
            }
            catch (err) {
                console.log(err);
            }
        }
        else {
            try {
                let updateResult = await updateLanguageDetails(langObj);
            }
            catch (err) {
                console.lo9g(err);
            }
        }
    }
    catch (err) {
        console.log(err);
    }

    try {
        let result = findById('tech_details', 'candidate_id', userId);
        fs.readFile(`${filename}/technology_details.ejs`, 'utf-8', function (err, data) {
            if (err) throw err;
            res.json({ data: data, userId: userId, result: result });
        });
    }
    catch (err) {
        console.log(err);
    }
}

const techDetails = async (req, res) => {
    let userId = req.query.userId;
    let tech = req.query.tech;
    tech = tech.split(',');
    let tpskill = req.query.tpskill;
    let tjskill = req.query.tjskill;
    let tmskill = req.query.tmskill;

    console.log(tech);
    console.log(tpskill);
    console.log(tjskill);
    console.log(tmskill);

    let techObj = new Object();
    tech.forEach((element) => {
        if (element == 'php') {
            if (tpskill != undefined) {
                techObj.php = tpskill;
            }
        }
        if (element == 'java') {
            if (tjskill != undefined) {
                techObj.java = tjskill;
            }
        }
        if (element == 'mysql') {
            if (tmskill != undefined) {
                techObj.mysql = tmskill;
            }
        }
    });
    console.log(techObj);
    try {
        let result = findById('tech_details', 'candidate_id', userId);
        if (result.length == 0) {
            try {
                let insertResult = await insertTechDetails(techObj);
                if (insertResult.length1 = 0) {
                    console.log("successfully inserted tech details")
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        else {
            try {
                let updateResult = await updateTechDetails(techObj);
                if (updateResult.length1 = 0) {
                    console.log("successfully updated tech details")
                }
            }
            catch (err) {
                console.log(err);
            }

        }
    }
    catch (err) {
        console.log(err);
    }
    try {
        let result = findById('expreience', 'candidate_id', userId);
        fs.readFile(`${filename}/experience.ejs`, 'utf-8', function (err, data) {
            if (err) throw err;
            res.json({ data: data, userId: userId, result: result });
        });
    }
    catch (err) {
        console.log(err);
    }
}

const experienceDetails = async (req, res) => {
    let userId = req.query.userId;
    let cname = req.query.cname;
    cname = cname.split(',');
    let design = req.query.design;
    design = design.split(',');
    let from = req.query.from;
    from = from.split(',');
    let to = req.query.to;
    to = to.split(',');
    console.log(cname);
    console.log(design);
    console.log(from);
    console.log(to);
    let expObj = [];
    for (let i = 0; i < cname.length; i++) {
        if (cname[i] != "" && design[i] != "" && from[i] != "" && to[i] != "") {
            expObj.push([cname[i], design[i], from[i], to[i]]);
        }
    }
    try {
        let result = findById('expreience', 'candidate_id', userId);
        if (result.length == 0) {
            try {
                let insertResult = await insertExpDetails(expObj);
                console.log("succeefully inserted exp details");
            }
            catch (err) {
                console.log(err);
            }

        }
        else {
            try {
                let updateResult = await updateExpDetails(expObj);
                console.log("success fully update exp details");
            }
            catch (err) {
                console.log(err);
            }

        }
    }
    catch (err) {
        console.log(err);
    }

    try {
        let result = findById('preference', 'candidate_id', userId);
        fs.readFile(`${filename}/preferences.ejs`, 'utf-8', function (err, data) {
            if (err) throw err;
            res.json({ data: data, userId: userId, result: result });
        });
    }
    catch (err) {
        console.log(err);
    }

}

const preferenceDetails = async (req, res) => {
    try {
        let result = findById('preference', 'candidate_id', userId);
        if (result.length == 0) {
            try {
                let insertResult = insertPrefDetails(req.query);
                console.log("inserted pref");
            }
            catch (err) {
                console.log(err);
            }
        }
        else {
            try {
                let updateResult = updatePrefDetails(req.query);
                console.log('updated pref');
            }
            catch (err) {
                console.log(err);
            }
        }
    }
    catch (err) {
        console.log(err);
    }
    try {
        let result = findById('e_reference', 'candidate_id', userId);
        fs.readFile(`${filename}/references.ejs`, 'utf-8', function (err, data) {
            if (err) throw err;
            res.json({ data: data, userId: userId, result: result });
        });
    }
    catch (err) {
        console.log(err);
    }


    let query1 = `select * from preference where candidate_id=${userId};`;
    conn.query(query1, (err, result) => {
        if (err) throw err;
        if (!result || result.length == 0) {

        }
        else {

        }
    });
    let query2 = `select * from e_reference where candidate_id=${userId};`;
    conn.query(query2, (err, result) => {
        if (err) throw err;

    });
}

const refDetails = (req, res) => {

    try {
        let result = findById('e_reference', 'candidate_id', userId);
        if (result.length == 0) {
            let insertResult = insertRef(req.query);
        }
        else {
            let updateResult = updateRef(req.query);
        }
    }
    catch (err) {
        console.log(err);
    }
    let userId = req.query.userId;

    let ename = req.query.ename;

    let edesign = req.query.edesign;

    let erelation = req.query.erelation;
    console.log(erelation);

    let query2 = `select * from e_reference where candidate_id=${userId};`;
    conn.query(query2, (err, result) => {
        if (err) throw err;
        if (!result || result.length == 0) {
            let query = `insert into e_reference(candidate_id, e_name, e_design, e_relation) values(${userId},"${ename}","${edesign}","${erelation}");`;
            conn.query(query, (err, result) => {
                if (err) throw err;
            });
        }
        else {
            let query = `update e_reference set e_name="${ename}",e_design="${edesign}", e_relation="${erelation}" where candidate_id=${userId};`;
            conn.query(query, (err, result) => {
                if (err) throw err;
                console.log("reference data updated successfully");
            });
        }
    });


    let query1 = 'select * from states';
    conn.query(query1, (err, result) => {
        if (err) throw err;
        fs.readFile(`${filename}/candidate_details.ejs`, 'utf-8', function (err, data) {
            if (err) throw err;
            res.json({ data: data, result: result });
        });
    });
}
module.exports = { showIndexPage, action, candidateDetails, educationDetails, languageDetails, techDetails, experienceDetails, preferenceDetails, refDetails };