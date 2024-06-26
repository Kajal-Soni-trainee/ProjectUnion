const { insertCandidateDetails, insertEducationDetails, updateEducationDetails,
    insertLanguageDetails, updateLanguageDetails, insertExpDetails, updateExpDetails,
    insertTechDetails, updateTechDetails, insertRefDetails, updateRefDetails, insertPrefDetails, updatePrefDetails, updateCandidate } = require('../models/dynamicJobAppSql');
const { findAll, findById } = require('../models/sql_function');
const fs = require('fs');
const filename = '/home/kajal-soni/Documents/Updated Project/ProjectUnion/views/dynamic_job_form_views';
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
                let updateResult = await updateEducationDetails(eduObj, userId);
                if (updateResult != undefined) {
                    console.log("successfully updated");
                }
            }
            catch (err) {
                console.log(err);
            }

        }
        else {
            try {
                let insertResult = await insertEducationDetails(eduObj, userId);
                if (insertResult != undefined) {
                    console.log("successfully inserted");
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
                let updateResult = await updateLanguageDetails(langObj, userId);
                if (updateResult != undefined) {
                    console.log("updated lang");
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        else {
            try {
                let insertResult = await insertLanguageDetails(langObj, userId);
                if (insertResult != undefined) {
                    console.log("inserted lang ");
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
        if (result.length > 0) {
            try {
                let updateResult = await updateTechDetails(techObj, userId);
                if (updateResult != undefined) {
                    console.log("successfully updated tech details")
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        else {
            try {
                let insertResult = await insertTechDetails(techObj, userId);
                if (insertResult != undefined) {
                    console.log("successfully inserted tech details")
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
        if (result.length > 0) {
            try {
                let updateResult = await updateExpDetails(expObj, userId);
                if (updateResult != undefined) {
                    console.log("success fully update exp details");
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        else {
            try {
                let insertResult = await insertExpDetails(expObj, userId);
                if (insertResult != undefined) {
                    console.log("succeefully inserted exp details");
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
    let userId = req.query.userId;
    try {
        let result = findById('preference', 'candidate_id', userId);
        if (result.length > 0) {
            try {
                let updateResult = await updatePrefDetails(req.query);
                if (updateResult != undefined) {
                    console.log('updated pref');
                }

            }
            catch (err) {
                console.log(err);
            }
        }
        else {
            try {
                let insertResult = await insertPrefDetails(req.query);
                if (insertResult != undefined) {
                    console.log("inserted pref");
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
        let result = findById('e_reference', 'candidate_id', userId);
        fs.readFile(`${filename}/references.ejs`, 'utf-8', function (err, data) {
            if (err) throw err;
            res.json({ data: data, userId: userId, result: result });
        });
    }
    catch (err) {
        console.log(err);
    }

}

const refDetails = async (req, res) => {
    let userId = req.query.userId;
    try {
        let result = findById('e_reference', 'candidate_id', userId);
        if (result.length > 0) {
            let updateResult = updateRefDetails(req.query);
            if (updateResult != undefined) {
                console.log('updated ref');
            }
        }
        else {
            let insertResult = insertRefDetails(req.query);
            if (insertResult != undefined) {
                console.log('inserted ref ');
            }
        }
    }
    catch (err) {
        console.log(err);
    }
    try {
        let result = await findAll('states');
        fs.readFile(`${filename}/candidate_details.ejs`, 'utf-8', function (err, data) {
            if (err) throw err;
            res.json({ data: data, result: result });
        });
    }
    catch (err) {
        console.log(err);
    }
}

const prefDetailPrev = async (req, res) => {
    let userId = req.query.userId;
    console.log(userId);
    try {
        let result = await findById('preference', 'candidate_id', userId);
        console.log(result);
        fs.readFile(`${filename}/preferences.ejs`, 'utf-8', function (err, data) {
            if (err) throw err;
            res.json({ data: data, result: result });
        })
    }
    catch (err) {
        console.log(err);
    }
}
const expDetailPrev = async (req, res) => {
    let userId = req.query.userId;
    console.log(userId);
    try {
        let result = await findById('expreience', 'candidate_id', userId);
        console.log(result);
        fs.readFile(`${filename}/experience.ejs`, 'utf-8', function (err, data) {
            if (err) throw err;
            res.json({ data: data, result: result });

        });
    }
    catch (err) {
        console.log(err);

    }
}

const techDetailPrev = async (req, res) => {
    let userId = req.query.userId;
    console.log(userId);
    try {
        let result = await findById('tech_details', 'candidate_id', userId);
        console.log(result);
        fs.readFile(`${filename}/technology_details.ejs`, 'utf-8', function (err, data) {
            if (err) throw err;
            res.json({ data: data, result: result });
        });
    }
    catch (err) {
        console.log(err);
    }
}

const langDetailPrev = async (req, res) => {
    let userId = req.query.userId;
    console.log(userId);
    try {
        let result = findById('language_details', 'candidate_id', userId);
        console.log(result);
        fs.readFile(`${filename}/language_details.ejs`, 'utf-8', function (err, data) {
            if (err) throw err;
            res.json({ data: data, result: result });
        });
    }
    catch (err) {
        console.log(err);
    }
}

const eduDetailPrev = async (req, res) => {
    let userId = req.query.userId;
    console.log(userId);
    try {
        let result = await findById('edu_master', 'candidate_id', userId);
        console.log(result);
        fs.readFile(`${filename}/education_details.ejs`, 'utf-8', function (err, data) {
            if (err) throw err;
            res.json({ data: data, result: result });
        });
    }
    catch (err) {
        console.log(err);

    }
}
const canDetailPrev = async (req, res) => {
    let userId = req.query.userId;
    console.log(userId);
    try {
        let result = await findById('Candidate_Details', 'candidate_id', userId);
        console.log(result);
        let result1 = await findAll('states');
        fs.readFile(`${filename}/candidate_details.ejs`, 'utf-8', function (err, data) {
            if (err) throw err;
            res.json({ data: data, result: result, result1: result1 });
        });
    }
    catch (err) {
        console.log(err);
    }
}

const updateLink = async (req, res) => {
    let id = req.query.id;
    console.log(id);
    try {
        let result = await findById('Candidate_Details', 'candidate_id', id);
        console.log(result);
        let result1 = await findAll('states');
        res.render('dynamic_job_form_views/index', { result: result, result1: result1, isUpdate: true });
        res.end();
    }
    catch (err) {

    }
}

const usersList = async (req, res) => {
    try {
        let result = await findAll('Candidate_Details');
        console.log(result)
        res.render('dynamic_job_form_views/list', { result: result });
    }
    catch (err) {
        console.log(err)
    }
}

const updateCandidateDetails = async (req, res) => {

    let id = req.query.id;

    try {
        let result = await updateCandidate(req.query);
        if (result) {
            let result1 = await findById('edu_master', 'candidate_id', id);
            console.log(result1);
            fs.readFile(`${filename}/education_details.ejs`, 'utf-8', function (err, data) {
                if (err) throw err;
                res.json({ data: data, result1: result1, userId: id });
            });
        }
    }
    catch (err) {
        console.log(err);
    }
}
module.exports = {
    showIndexPage, action, candidateDetails, educationDetails, languageDetails, techDetails, experienceDetails, preferenceDetails, refDetails, prefDetailPrev, expDetailPrev, techDetailPrev, langDetailPrev
    , eduDetailPrev, canDetailPrev, updateLink, usersList, updateCandidateDetails
};