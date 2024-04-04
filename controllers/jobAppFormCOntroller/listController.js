const { fetch_Can_Details, fetch_Edu_Details, fetch_Exp_Details, fetch_Lang_Details, fetch_Pref_Details, fetch_Ref_Details, fetch_Tech_Details } = require('../../models/jobAppFormSql/listJobApp');
const { findById } = require('../../models/sql_function');
const displayList = async (req, res) => {
    let can = await fetch_Can_Details();
    let exp = await fetch_Exp_Details();
    let edu = await fetch_Edu_Details();
    let lang = await fetch_Lang_Details();
    let tech = await fetch_Tech_Details();
    let ref = await fetch_Ref_Details();
    let pref = await fetch_Pref_Details();
    res.render('job_app_form_view/list', { can: can, exp: exp, edu: edu, lang: lang, tech: tech, ref: ref, pref: pref });
    res.end();
}

const displayUpdatePage = async (req, res) => {
    let id = parseInt(req.query.id);
    console.log(id);
    let can = await findById('Candidate_Details', 'candidate_id', id);
    if (can.length == 0) {
        can.push({
            candidate_id: id,
            first_name: '',
            last_name: '',
            design: '',
            current_addreess: ' ',
            permanent_address: ' ',
            email: '',
            phone: '',
            city: '',
            state: '',
            gender: '',
            zip_code: '',
            relationship_status: ''
        })
    }
    let exp = await findById('edu_master', 'candidate_id', id);
    console.log(exp);
    if (exp.length == 0) {
        exp.push({
            candidate_id: id,
            company_name: '',
            design: '',
            worked_from: '',
            worked_till: ''
        })
    }
    let edu = await findById('expreience ', 'candidate_id', id);
    console.log(edu);
    if (edu.length == 0) {
        edu.push({
            candidate_id: id,
            course_type: '',
            passing_year: '',
            percent: '',
            course_name: '',
            school_name: ''
        })
    }

    let lang = await findById('e_reference', 'candidate_id', id);
    console.log(lang);
    if (lang.length == 0) {
        lang.push({
            candidate_id: id,
            language: '',
            lang_skill: ''
        })
    }
    let tech = await findById('preference ', 'candidate_id', id);
    console.log(tech);
    if (tech.length == 0) {
        tech.push({
            candidate_id: id,
            tech: '',
            tech_skill: ''
        })
    }
    let ref = await findById('language_details', 'candidate_id', id);
    console.log(ref);
    if (ref.length == 0) {
        ref.push({
            candidate_id: id,
            e_name: '',
            e_design: '',
            e_relation: ''
        })
    }
    let pref = await findById('tech_details', 'candidate_id', id);
    console.log(pref);
    if (pref.length == 0) {
        pref.push({
            candidate_id: id,
            prefered_location: '',
            notice_period: '',
            department: '',
            current_ctc: '',
            expected_ctc: ''
        });
    }

    res.render('job_app_form_view/index', { dataObj: "", errorObj: "", isError: false, isUpdate: true, can: can, exp: exp, edu: edu, lang: lang, tech: tech, ref: ref, pref: pref });
    res.end();
}
module.exports = { displayList, displayUpdatePage };