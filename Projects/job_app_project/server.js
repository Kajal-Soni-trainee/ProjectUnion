const express = require("express");
const path = require("path");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
const conn = require("./mysql.js");
const { error } = require("console");
const e = require("express");
app.use(express.static(path.join(__dirname, '/views')));
app.get('/', (req, res) => {
    res.render('index', { dataObj: "", errorObj: "", isError: false, isUpdate:false,can:"",exp:"",edu:"",lang:"",tech:"",ref:"",pref:"" });
    res.end();
});

app.post('/', (req, res) => {
    console.log("form is submitted");
    console.log(req.body);
    let fname = req.body.fname;
    let lname = req.body.lname;
    let design = req.body.design;
    let email = req.body.email;
    let add1 = req.body.add1;
    let add2 = req.body.add2;
    let state = req.body.state;
    let city = req.body.city;
    let gender = req.body.gender;
    let zipcode = req.body.zipcode;
    let phone = req.body.phone;
    let relation = req.body.relation;
    let ssc_boardname = req.body.ssc_boardname;
    let ssc_sname = req.body.ssc_sname;
    let ssc_pyear = req.body.ssc_pyear;
    let ssc_percent = req.body.ssc_percent;
    let hsc_boardname = req.body.hsc_boardname;
    let hsc_sname = req.body.hsc_sname;
    let hsc_pyear = req.body.hsc_pyear;
    let hsc_percent = req.body.hsc_percent;
    let d_boardname = req.body.d_boardname;
    let d_sname = req.body.d_sname;
    let d_pyear = req.body.d_pyear;
    let d_percent = req.body.d_percent;
    let m_boardname = req.body.m_boardname;
    let m_sname = req.body.m_sname;
    let m_pyear = req.body.m_pyear;
    let m_percent = req.body.m_percent;
    let lang = req.body.lang;
    let lhskill = req.body.lhskill;
    let leskill = req.body.leskill;
    let lgskill = req.body.lgskill;
    let tech = req.body.tech;
    let tpskill = req.body.tpskill;
    let tjskill = req.body.tjskill;
    let toskill = req.body.toskill;
    let e_ctc = req.body.e_ctc;
    let c_ctc = req.body.c_ctc;
    let n_period = req.body.n_period;
    let location = req.body.location;
    let cname = req.body.cname;
    let pos = req.body.pos;
    let from = req.body.from;
    let to = req.body.to;
    let ename = req.body.ename;
    let edesign = req.body.edesign;
    let erelation = req.body.erelation;
    if (cname != undefined) {
        console.log(cname);
    }
    if (pos != undefined) {
        console.log(pos);
    }
    if (from != undefined) {
        console.log(from);
    }
    if (to != undefined) {
        console.log(to);
    }
    console.log("ename");
    console.log(ename);
    console.log("edesign");
    console.log(edesign);
    console.log("erelation");
    console.log(erelation);
    let eduObj = [];
    eduObj.push(["ssc", ssc_pyear, ssc_percent, ssc_boardname, ssc_sname]);
    eduObj.push(["hsc", hsc_pyear, hsc_percent, hsc_boardname, hsc_sname]);
    if (d_boardname != "" && d_percent != "" && d_pyear != "" && d_sname != "") {
        eduObj.push(["degree", d_pyear, d_percent, d_boardname, d_sname]);
    }
    if (m_boardname != "" && m_percent != "" && m_pyear != "" && m_sname != "") {
        eduObj.push(["master", m_pyear, m_percent, m_boardname, m_sname]);
    }
    console.log(eduObj);
    let dataObj = new Object();
    dataObj.fname = fname;
    dataObj.lname = lname;
    dataObj.design = design;
    dataObj.email = email;
    dataObj.add1 = add1;
    dataObj.add2 = add2;
    dataObj.state = state;
    dataObj.city = city;
    dataObj.zipcode = zipcode;
    dataObj.phone = phone;
    dataObj.ssc_boardname = ssc_boardname;
    dataObj.ssc_sname = ssc_sname;
    dataObj.ssc_pyear = ssc_pyear;
    dataObj.ssc_percent = ssc_percent;
    dataObj.hsc_boardname = hsc_boardname;
    dataObj.hsc_sname = hsc_sname;
    dataObj.hsc_pyear = hsc_pyear;
    dataObj.hsc_percent = hsc_percent;
    dataObj.d_boardname = d_boardname;
    dataObj.d_sname = d_sname;
    dataObj.d_pyear = d_pyear;
    dataObj.d_percent = d_percent;
    dataObj.m_boardname = m_boardname;
    dataObj.m_sname = m_sname;
    dataObj.m_pyear = m_pyear;
    dataObj.m_percent = m_percent;
    dataObj.e_ctc = e_ctc;
    dataObj.c_ctc = c_ctc;
    dataObj.n_period = n_period;
    dataObj.lang = lang;
    dataObj.lhskill = lhskill;
    dataObj.leskill = leskill;
    dataObj.lgskill = lgskill;
    dataObj.tech = tech;
    dataObj.tpskill = tpskill;
    dataObj.tjskill = tjskill;
    dataObj.toskill = toskill;
     
    let errorFlag = 0;
    let namePtn = /[a-zA-Z]/;
    let phonePtn = /[0-9]{10}/;
    let emailPtn = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let charPattern = /[0-9]/;
    let percentPtn = /^(\d{1,2}\.\d{1,2})$/;
    let yearPtn = /^(\d{1,2}\-\d{1,2}\-\d{4})$/;
    let ctcPtn = /^(\d{1,2}\.\d{1,2})$/;
    let period = /^[0-9]{2}$/;
    const errorObj = new Object();
    if (lang != undefined) {
        if (typeof lang != 'string') {
            if (lang.length != 0) {
                lang.forEach((element) => {
                    if (element == "hindi") {
                        if (lhskill.length == 0) {
                            errorObj.lang = "please select atleast one option for language hindi";
                            errorFlag++;
                        }
                    }
                    else if (element == "english") {
                        if (leskill.length == 0) {
                            errorObj.lang = "please select atleast one option for language english";
                            errorFlag++;
                        }
                    }
                    else {
                        if (lgskill.length == 0) {
                            errorObj.lang = "please select atleast one option for language guajrati";
                            errorFlag++;
                        }
                    }
                });
            }
            else {
                errorObj.lang = "";
            }
        }
        else {
            if (lang == "hindi") {
                if (lhskill == undefined) {
                    errorObj.lang = "please select atleast one option for language english";
                    errorFlag++;
                }

            }
            else if (lang == "english") {
                if (leskill == undefined) {
                    errorObj.lang = "please select atleast one option for language english";
                    errorFlag++;
                }

            }
            else {
                if (lgskill == undefined) {
                    errorObj.lang = "please select atleast one option for language gujarati";
                    errorFlag++;
                }
            }
        }
    }
    if (tech != undefined) {
        if (typeof tech != 'string') {
            if (tech.length != 0) {
                tech.forEach((element) => {
                    if (element == "php") {
                        if (tpskill == undefined) {
                            errorObj.tech = "please select your skill level in php";
                            errorFlag++;
                        }
                    }
                    else if (element == "Java") {
                        if (tjskill == undefined) {
                            errorObj.tech = "please select your skill level in java";
                            errorFlag++;
                        }
                    }
                    else {
                        if (toskill == undefined) {
                            errorObj.tech = "please select your skill level in oracle";
                            errorFlag++;
                        }
                    }
                });
            }
        }
        else {
            if (tech == "php") {
                if (tpskill == undefined) {
                    errorObj.tech = "please select your skill level in php";
                    errorFlag++;
                }
            }
            else if (tech == undefined) {
                if (tjskill == "") {
                    errorObj.tech = "please select your skill level in java";
                    errorFlag++;
                }
            }
            else {
                if (toskill == undefined) {
                    errorObj.tech = "please select your skill level in oracle";
                    errorFlag++;
                }
            }
        }
    }
    if (fname == "") {
        errorObj.fname = "please enter your first name";
        errorFlag++;
    }
    else if (!namePtn.test(fname)) {
        errorObj.fname = "your name should only contain characters";
        errorFlag++;
    }
    else {
        errorObj.fname = "";
    }
    if (lname == "") {
        errorObj.lname = "please enter your last name";
        errorFlag++;
    }
    else if (!namePtn.test(lname)) {
        errorObj.lname = "your name should only contain characters";
        errorFlag++;
    }
    else {
        errorObj.lname = "";
    }
    if (design == "") {
        errorObj.design = "please enter your designation";
        errorFlag++;
    }
    else {
        errorObj.design = "";
    }
    if (add1 == "") {
        errorObj.add1 = "please enter your address";
        errorFlag++;
    }
    else {
        errorObj.add1 = "";
    }
    if (email == "") {
        errorObj.email = "please enter your email";
        errorFlag++;
    }

    else {
        errorObj.email = "";
    }
    if (state == "") {
        errorObj.state = "Please enter your state name";
        errorFlag++;
    }
    else if (charPattern.test(state)) {
        errorObj.state = "digits are not allowed";
        errorFlag++;
    }
    else {
        errorObj.state = "";
    }
    if (city == "") {
        errorObj.city = "please enter your city name";
        errorFlag++;
    }
    else if (charPattern.test(city)) {
        errorObj.city = "only characters are allowed";
        errorFlag++;
    }
    else {
        errorObj.city = "";
    }
    if (zipcode == "") {
        errorObj.zipcode = "please enter your zipcode";
        errorFlag++;
    }
    if (phone == "") {
        errorObj.phone = "please enter your phone number";
        errorFlag++;
    }

    else {
        errorObj.phone = "";
    }
    if (ssc_boardname == "") {
        errorObj.ssc_boardname = "please enter your ssc course name";
        errorFlag++;
    }
    else if (charPattern.test(ssc_boardname)) {
        errorObj.ssc_boardname = "digits are not allowed";
        errorFlag++;
    }
    else {
        errorObj.ssc_boardname = "";
    }
    if (ssc_percent == "") {
        errorObj.ssc_percent = "please enter your ssc percent";
        errorFlag++;
    }

    else {
        errorObj.ssc_percent = "";
    }
    if (ssc_sname == "") {
        errorObj.ssc_sname = "please enter your school name";
        errorFlag++;
    }
    else if (charPattern.test(ssc_sname)) {
        errorObj.ssc_sname = "digits are not allowed";
        errorFlag++;
    }
    else {
        errorObj.ssc_sname = "";
    }
    if (ssc_pyear == "") {
        errorObj.ssc_pyear = "please enter your passing year";
        errorFlag++;
    }

    else {
        errorObj.ssc_pyear = "";
    }
    if (hsc_boardname == "") {
        errorObj.hsc_boardname = "please enter your course name";
        errorFlag++;
    }
    else if (charPattern.test(hsc_boardname)) {
        errorObj.hsc_boardname = "digits are not allowed";
        errorFlag++;
    }
    else {
        errorObj.hsc_boardname = "";
    }
    if (hsc_percent == "") {
        errorObj.hsc_percent = "please enter your percentage";
        errorFlag++;
    }

    else {
        errorObj.hsc_percent = "";
    }
    if (hsc_pyear == "") {
        errorObj.hsc_pyear = "please enter your passing year";
        errorFlag++;
    }

    else {
        errorObj.hsc_pyear = "";
    }
    if (hsc_sname == "") {
        errorObj.hsc_sname = "please enter your school name";
        errorFlag++;
    }
    else if (charPattern.test(hsc_sname)) {
        errorObj.hsc_sname = "digits are not allowed";
        errorFlag++;
    }
    else {
        errorObj.hsc_sname = "";
    }
    if (e_ctc == "") {
        errorObj.e_ctc = "please enter your expected ctc";
        errorFlag++;
    }

    else {
        errorObj.e_ctc = "";
    }
    if (c_ctc == "") {
        errorObj.c_ctc = "please enter your current ctc";
    }

    else {
        errorObj.c_ctc = "";
    }
    if (n_period == "") {
        errorObj.n_period = "please enter notice period";
        errorFlag++;
    }

    else {
        errorObj.n_period = "";
    }
    for(let i=0; i<cname.length; i++){
        if(cname[i]!=""){
            if(pos[i]=="" && from[i]=="" && to[i]==""){
                errorObj.experience="please fill all fields of experience";
                errorFlag++;
            }
        }
        if(pos[i]!=""){
            if(cname[i]=="" && from[i]=="" && to[i]==""){
                errorObj.experience="please fill all fields of experience";
                errorFlag++;
            }
        }
        if(from[i]!=""){
            if(cname[i]=="" && pos[i]=="" && to[i]==""){
                errorObj.experience="please fill all fields of experience";
                errorFlag++;
            }
        }
        if(to[i]!=""){
            if(cname[i]=="" && pos[i]=="" && from[i]==""){
                errorObj.experience="please fill all fields of experience";
                errorFlag++;
            }
        }
    }
    for(let i=0; i<ename.length; i++){
        if(ename[i]!=""){
            if(edesign[i]=="" && erelation[i]==""){
                errorObj.ref="please fill all fields of experience";
            }
        }
        if(edesign[i]!=""){
            if(ename[i]=="" && erelation[i]==""){
                errorObj.ref="please fill all fields of experience";
            }
        }
        if(erelation[i]!=""){
            if(edesign[i]=="" && ename[i]==""){
                errorObj.ref="please fill all fields of experience";
            }
        }
    }
    if (errorFlag != 0) {
        console.log(errorFlag);
        res.render('index', { dataObj: dataObj, errorObj: errorObj, isError: true, can:"",exp:"",edu:"",lang:"",tech:"",ref:"",pref:""});
    }
    else {

        let query = `insert into Candidate_Details (first_name, last_name, design, current_addreess, permanent_address,email,phone,city,state,gender,zip_code,relationship_status) values ("${fname}","${lname}","${design}",
        "${add1}","${add2}","${email}","${phone}","${city}","${state}","${gender}","${zipcode}","${relation}")`;
        conn.query(query, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                let user_id = result.insertId;
                let query1 = `insert into preference(candidate_id,prefered_location,notice_period,department,current_ctc,expected_ctc) values (${user_id},"${location}","${n_period}","${design}",${c_ctc},${e_ctc});`;
                conn.query(query1, (err, result) => {
                    if (err) throw err;
                });
                eduObj.forEach((element) => {
                    let query2 = `insert into edu_master (candidate_id, course_type, passing_year, percent,course_name,school_name) values(${user_id},"${element[0]}","${element[1]}",${element[2]},"${element[3]}","${element[4]}")`;
                    conn.query(query2, (err, result) => {
                        if (err) throw err;
                    });
                });


                if (cname != undefined && pos != undefined && from != undefined && to != undefined) {
                    for (let i = 0; i < cname.length; i++) {
                        if (cname[i] != '' && pos[i] != '' && from[i] != '' && to[i] != '') {
                            let query13 = `insert into expreience (candidate_id,company_name,design,worked_from,worked_till) values(${user_id},"${cname[i]}","${pos[i]}","${from[i]}","${to[i]}");`;
                            conn.query(query13, (err, result) => {
                                if (err) throw err;
                            });
                        }
                    }
                }

                if (ename != undefined && edesign != undefined && erelation != undefined) {
                    for (let i = 0; i < ename.length; i++) {
                        if (ename[i] != '' && edesign != '' && erelation != '') {
                            let query14 = `insert into e_reference(candidate_id, e_name, e_design, e_relation) values(${user_id},"${ename[i]}","${edesign[i]}","${erelation[i]}");`;
                            conn.query(query14, (err, result) => {
                                if (err) throw err;
                            });
                        }
                    }
                }
                if (lang != undefined) {
                    if (typeof lang != 'string') {
                        for (let i = 0; i < lang.length; i++) {
                            if (lang[i] == "hindi") {
                                if (typeof lhskill != 'string') {
                                    lhskill.forEach(element => {
                                        let query11 = `insert into language_details (candidate_id, language, lang_skill) values (${user_id},"${lang[i]}","${element}");`;
                                        conn.query(query11, (err, result) => {
                                            if (err) throw err;
                                        });
                                    });
                                }
                                else {
                                    let query11 = `insert into language_details (candidate_id, language, lang_skill) values (${user_id},"${lang[i]}","${lhskill}");`;
                                    conn.query(query11, (err, result) => {
                                        if (err) throw err;
                                    });
                                }
                            }
                            else if (lang[i] == "english") {
                                if (typeof leskill != 'string') {
                                    leskill.forEach(element => {
                                        let query11 = `insert into language_details (candidate_id, language, lang_skill) values (${user_id},"${lang[i]}","${element}");`;
                                        conn.query(query11, (err, result) => {
                                            if (err) throw err;
                                        });
                                    });
                                }
                                else {
                                    let query11 = `insert into language_details (candidate_id, language, lang_skill) values (${user_id},"${lang[i]}","${leskill}");`;
                                    conn.query(query11, (err, result) => {
                                        if (err) throw err;
                                    });
                                }
                            }
                            else {
                                if (typeof lgskill != 'string') {
                                    lgskill.forEach(element => {
                                        let query11 = `insert into language_details (candidate_id, language, lang_skill) values (${user_id},"${lang[i]}","${element}");`;
                                        conn.query(query11, (err, result) => {
                                            if (err) throw err;
                                        });
                                    });
                                }
                                else {
                                    let query11 = `insert into language_details (candidate_id, language, lang_skill) values (${user_id},"${lang[i]}","${lgskill}");`;
                                    conn.query(query11, (err, result) => {
                                        if (err) throw err;
                                    });
                                }
                            }
                        }
                    }
                    else {
                        if (lang == "hindi") {
                            if (typeof lhskill != 'string') {
                                lhskill.forEach(element => {
                                    let query11 = `insert into language_details (candidate_id, language, lang_skill) values (${user_id},"${lang}","${element}");`;
                                    conn.query(query11, (err, result) => {
                                        if (err) throw err;
                                    });
                                });
                            }
                            else {
                                let query11 = `insert into language_details (candidate_id, language, lang_skill) values (${user_id},"${lang}","${lhskill}");`;
                                conn.query(query11, (err, result) => {
                                    if (err) throw err;
                                });
                            }
                        }
                        else if (lang == "english") {
                            if (typeof leskill != 'string') {
                                leskill.forEach(element => {
                                    let query11 = `insert into language_details (candidate_id, language, lang_skill) values (${user_id},"${lang}","${element}");`;
                                    conn.query(query11, (err, result) => {
                                        if (err) throw err;
                                    });
                                });
                            }
                            else {
                                let query11 = `insert into language_details (candidate_id, language, lang_skill) values (${user_id},"${lang}","${leskill}");`;
                                conn.query(query11, (err, result) => {
                                    if (err) throw err;
                                });
                            }
                        }
                        else {
                            if (typeof lgskill != 'string') {
                                lgskill.forEach(element => {
                                    let query11 = `insert into language_details (candidate_id, language, lang_skill) values (${user_id},"${lang}","${element}");`;
                                    conn.query(query11, (err, result) => {
                                        if (err) throw err;
                                    });
                                });
                            }
                            else {
                                let query11 = `insert into language_details (candidate_id, language, lang_skill) values (${user_id},"${lang}","${lgskill}");`;
                                conn.query(query11, (err, result) => {
                                    if (err) throw err;
                                });
                            }
                        }
                    }
                }
              if(tech!=undefined){
                if (typeof tech != 'string') {
                    for (let i = 0; i < tech.length; i++) {
                        if (tech[i] == "php") {
                            let query12 = `insert into tech_details (candidate_id, tech, tech_skill) values(${user_id},"${tech[i]}","${tpskill}");`;
                            conn.query(query12, (err, result) => {
                                if (err) throw err;
                            });
                        }
                        else if (tech[i] == "Java") {
                            let query12 = `insert into tech_details (candidate_id, tech, tech_skill) values(${user_id},"${tech[i]}","${tjskill}");`;
                            conn.query(query12, (err, result) => {
                                if (err) throw err;
                            });
                        }
                        else {
                            let query12 = `insert into tech_details (candidate_id, tech, tech_skill) values(${user_id},"${tech[i]}","${toskill}");`;
                            conn.query(query12, (err, result) => {
                                if (err) throw err;
                            });
                        }
                    }
                }
                else {
                    if (tech == "php") {
                        let query12 = `insert into tech_details (candidate_id, tech, tech_skill) values(${user_id},"${tech}","${tpskill}");`;
                        conn.query(query12, (err, result) => {
                            if (err) throw err;
                        });
                    }
                    else if (tech == "Java") {
                        let query12 = `insert into tech_details (candidate_id, tech, tech_skill) values(${user_id},"${tech}","${tjskill}");`;
                        conn.query(query12, (err, result) => {
                            if (err) throw err;
                        });
                    }
                    else {
                        let query12 = `insert into tech_details (candidate_id, tech, tech_skill) values(${user_id},"${tech}","${toskill}");`;
                        conn.query(query12, (err, result) => {
                            if (err) throw err;
                        });
                    }
                }
            }
        }
        });
        res.render('index', { dataObj: "", errorObj: "", isError: false ,isUpdate:false, can:"",exp:"",edu:"",lang:"",tech:"",ref:"",pref:""});
        res.end();
    }

});
app.get('/list',(req,res)=>{
async function fetch_Can_Details(){
    return promise = new Promise((resolve,reject)=>{
        let query='select * from Candidate_Details;';
        conn.query(query,(err,result)=>{
               if(err) throw err;
               resolve(result);
        });
    })
}
async function fetch_Edu_Details(){
    return promise = new Promise((resolve,reject)=>{
        let query='select * from edu_master;';
        conn.query(query,(err,result)=>{
               if(err) throw err;
               resolve(result);
        });
    })
}

async function fetch_Exp_Details(){
    return promise = new Promise((resolve,reject)=>{
        let query='select * from expreience;';
        conn.query(query,(err,result)=>{
               if(err) throw err;
               resolve(result);
        });
    })
}

async function fetch_Ref_Details(){
    return promise = new Promise((resolve,reject)=>{
        let query='select * from e_reference;';
        conn.query(query,(err,result)=>{
               if(err) throw err;
               resolve(result);
        });
    });
}
async function fetch_Pref_Details(){
    return promise = new Promise((resolve,reject)=>{
        let query='select * from preference;';
        conn.query(query,(err,result)=>{
               if(err) throw err;
               resolve(result);
        });
    })
}
async function fetch_Lang_Details(){
    return promise = new Promise((resolve,reject)=>{
        let query='select * from language_details;';
        conn.query(query,(err,result)=>{
               if(err) throw err;
               resolve(result);
        });
    })
}
async function fetch_Tech_Details(){
    return promise = new Promise((resolve,reject)=>{
        let query='select * from tech_details;';
        conn.query(query,(err,result)=>{
               if(err) throw err;
               resolve(result);
        });
    })
}
async function renderData(){
    let can=await fetch_Can_Details();
    let exp=await fetch_Exp_Details();
    let edu=await fetch_Edu_Details();
    let lang=await fetch_Lang_Details();
    let tech= await fetch_Tech_Details();
    let ref=await fetch_Ref_Details();
    let pref= await fetch_Pref_Details();
    res.render('list',{can:can,exp:exp,edu:edu,lang:lang,tech:tech,ref:ref,pref:pref});
    res.end();
}
renderData();
});


app.get('/update',(req,res)=>{
    let id = parseInt(req.query.id);
    console.log(id);
    async function fetch_Can_Details(){
        return promise = new Promise((resolve,reject)=>{
            let query=`select * from Candidate_Details where candidate_id=${id};`;
            conn.query(query,(err,result)=>{
                   if(err) throw err;
                   resolve(result);
            });
        })
    }
    async function fetch_Edu_Details(){
        return promise = new Promise((resolve,reject)=>{
            let query=`select * from edu_master where candidate_id=${id};`;
            conn.query(query,(err,result)=>{
                   if(err) throw err;
                   resolve(result);
            });
        })
    }
    
    async function fetch_Exp_Details(){
        return promise = new Promise((resolve,reject)=>{
            let query=`select * from expreience where candidate_id=${id};`;
            conn.query(query,(err,result)=>{
                   if(err) throw err;
                   resolve(result);
            });
        })
    }
    
    async function fetch_Ref_Details(){
        return promise = new Promise((resolve,reject)=>{
            let query=`select * from e_reference where candidate_id=${id};`;
            conn.query(query,(err,result)=>{
                   if(err) throw err;
                   resolve(result);
            });
        });
    }
    async function fetch_Pref_Details(){
        return promise = new Promise((resolve,reject)=>{
            let query=`select * from preference where candidate_id=${id};`;
            conn.query(query,(err,result)=>{
                   if(err) throw err;
                   resolve(result);
            });
        })
    }
    async function fetch_Lang_Details(){
        return promise = new Promise((resolve,reject)=>{
            let query=`select * from language_details where candidate_id=${id};`;
            conn.query(query,(err,result)=>{
                   if(err) throw err;
                   resolve(result);
            });
        })
    }
    async function fetch_Tech_Details(){
        return promise = new Promise((resolve,reject)=>{
            let query=`select * from tech_details where candidate_id=${id};`;
            conn.query(query,(err,result)=>{
                   if(err) throw err;
                   resolve(result);
            });
        })
    }

    async function renderData(){
        let can=await fetch_Can_Details();
        if(can.length==0){
           can.push({
            candidate_id:id,
            first_name: '',
            last_name: '',
            design: '',
            current_addreess: ' ',
            permanent_address: ' ',
            email: '',
            phone:'',
            city: '',
            state: '',
            gender: '',
            zip_code: '',
            relationship_status: ''
           })
        }
        let exp=await fetch_Exp_Details();
        console.log(exp);
        if(exp.length==0){
            exp.push({          
                candidate_id:id,
                company_name: '',
                design: '',
                worked_from: '',
                worked_till: ''
            })
        }
        let edu=await fetch_Edu_Details();
        console.log(edu);
        if(edu.length==0){
         edu.push({           
            candidate_id:id,
            course_type: '',
            passing_year: '',
            percent: '',
            course_name: '',
            school_name: ''
         })
        }

        let lang=await fetch_Lang_Details();
        console.log(lang);
        if(lang.length==0){
            lang.push({
                candidate_id:id,
                language: '',
                lang_skill: ''
            })
        }
        let tech= await fetch_Tech_Details();
        console.log(tech);
        if(tech.length==0){
         tech.push({
            candidate_id: id,
            tech: '',
            tech_skill: ''
         })
        }
        let ref=await fetch_Ref_Details();
       console.log(ref);
       if(ref.length==0){
            ref.push({
                candidate_id:id,
                e_name: '',
                e_design: '',
                e_relation: '' 
            })
       }
        let pref= await fetch_Pref_Details();
        console.log(pref);
        if(pref.length==0){
            pref.push({
                candidate_id:id,
                prefered_location: '',
                notice_period: '',
                department: '',
                current_ctc: '',
                expected_ctc:''
            });
        }
        
res.render('index',{dataObj:"",errorObj:"", isError:false,isUpdate:true, can:can,exp:exp,edu:edu,lang:lang,tech:tech,ref:ref,pref:pref});
res.end();
    }
    renderData();
   
});
app.post('/updated',(req,res)=>{
  console.log(req.body);
  let id= req.body.id;
  let fname = req.body.fname;
    let lname = req.body.lname;
    let design = req.body.design;
    let email = req.body.email;
    let add1 = req.body.add1;
    let add2 = req.body.add2;
    let state = req.body.state;
    let city = req.body.city;
    let gender = req.body.gender;
    let zipcode = req.body.zipcode;
    let phone = req.body.phone;
    let relation = req.body.relation;
    let ssc_boardname = req.body.ssc_boardname;
    let ssc_sname = req.body.ssc_sname;
    let ssc_pyear = req.body.ssc_pyear;
    let ssc_percent = req.body.ssc_percent;
    let hsc_boardname = req.body.hsc_boardname;
    let hsc_sname = req.body.hsc_sname;
    let hsc_pyear = req.body.hsc_pyear;
    let hsc_percent = req.body.hsc_percent;
    let d_boardname = req.body.d_boardname;
    let d_sname = req.body.d_sname;
    let d_pyear = req.body.d_pyear;
    let d_percent = req.body.d_percent;
    let m_boardname = req.body.m_boardname;
    let m_sname = req.body.m_sname;
    let m_pyear = req.body.m_pyear;
    let m_percent = req.body.m_percent;
    let lang = req.body.lang;
    let lhskill = req.body.lhskill;
    let leskill = req.body.leskill;
    let lgskill = req.body.lgskill;
    let tech = req.body.tech;
    let tpskill = req.body.tpskill;
    let tjskill = req.body.tjskill;
    let toskill = req.body.toskill;
    let e_ctc = req.body.e_ctc;
    let c_ctc = req.body.c_ctc;
    let n_period = req.body.n_period;
    let location = req.body.location;
    let cname = req.body.cname;
    let pos = req.body.pos;
    let from = req.body.from;
    let to = req.body.to;
    let ename = req.body.ename;
    let edesign = req.body.edesign;
    let erelation = req.body.erelation;
    let langObj= new Object();
    if(lang!=undefined){
    lang.forEach((element)=>{
      if(element=='hindi'){
        if(lhskill!=undefined){
        langObj.hindi=lhskill;
        }
      }
      if(element=='english'){
        if(leskill!=undefined){
            langObj.english=leskill;
        }
      }
      if(element=='gujararti'){
        if(lgskill!=undefined){
            langObj.gujarati=lgskill;
        }
      }
    });
}
    const techObj=new Object();
       if(tech!=undefined){
        tech.forEach((element)=>{
            if(element=="php"){
                if(tpskill!=undefined){
                techObj.php=tpskill;
                }
            }
            if(element=="Java"){
                if(tjskill!=undefined){
                    techObj.Java=tjskill;
                }
            }
            if(element=='oracle'){
                if(toskill!=undefined){
                    techObj.oracle=toskill;
                }
            }
        });
       }
    if (cname != undefined) {
        console.log(cname);
    }
    if (pos != undefined) {
        console.log(pos);
    }
    if (from != undefined) {
        console.log(from);
    }
    if (to != undefined) {
        console.log(to);
    }
    console.log("ename");
    console.log(ename);
    console.log("edesign");
    console.log(edesign);
    console.log("erelation");
    console.log(erelation);
    let eduObj = [];
    eduObj.push(["ssc", ssc_pyear, ssc_percent, ssc_boardname, ssc_sname]);
    eduObj.push(["hsc", hsc_pyear, hsc_percent, hsc_boardname, hsc_sname]);
    if (d_boardname != "" && d_percent != "" && d_pyear != "" && d_sname != "") {
        eduObj.push(["degree", d_pyear, d_percent, d_boardname, d_sname]);
    }
    if (m_boardname != "" && m_percent != "" && m_pyear != "" && m_sname != "") {
        eduObj.push(["master", m_pyear, m_percent, m_boardname, m_sname]);
    }
    console.log(eduObj);


    let dataObj = new Object();
    dataObj.fname = fname;
    dataObj.lname = lname;
    dataObj.design = design;
    dataObj.email = email;
    dataObj.add1 = add1;
    dataObj.add2 = add2;
    dataObj.state = state;
    dataObj.city = city;
    dataObj.zipcode = zipcode;
    dataObj.phone = phone;
    dataObj.ssc_boardname = ssc_boardname;
    dataObj.ssc_sname = ssc_sname;
    dataObj.ssc_pyear = ssc_pyear;
    dataObj.ssc_percent = ssc_percent;
    dataObj.hsc_boardname = hsc_boardname;
    dataObj.hsc_sname = hsc_sname;
    dataObj.hsc_pyear = hsc_pyear;
    dataObj.hsc_percent = hsc_percent;
    dataObj.d_boardname = d_boardname;
    dataObj.d_sname = d_sname;
    dataObj.d_pyear = d_pyear;
    dataObj.d_percent = d_percent;
    dataObj.m_boardname = m_boardname;
    dataObj.m_sname = m_sname;
    dataObj.m_pyear = m_pyear;
    dataObj.m_percent = m_percent;
    dataObj.e_ctc = e_ctc;
    dataObj.c_ctc = c_ctc;
    dataObj.n_period = n_period;
    dataObj.lang = lang;
    dataObj.lhskill = lhskill;
    dataObj.leskill = leskill;
    dataObj.lgskill = lgskill;
    dataObj.tech = tech;
    dataObj.tpskill = tpskill;
    dataObj.tjskill = tjskill;
    dataObj.toskill = toskill;
     
    let errorFlag = 0;
    let namePtn = /[a-zA-Z]/;
    let phonePtn = /[0-9]{10}/;
    let emailPtn = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let charPattern = /[0-9]/;
    let percentPtn = /^(\d{1,2}\.\d{1,2})$/;
    let yearPtn = /^(\d{1,2}\-\d{1,2}\-\d{4})$/;
    let ctcPtn = /^(\d{1,2}\.\d{1,2})$/;
    let period = /^[0-9]{2}$/;
    const errorObj = new Object();
    if (lang != undefined) {
        if (typeof lang != 'string') {
            if (lang.length != 0) {
                lang.forEach((element) => {
                    if (element == "hindi") {
                        if (lhskill.length == 0) {
                            errorObj.lang = "please select atleast one option for language hindi";
                            errorFlag++;
                        }
                    }
                    else if (element == "english") {
                        if (leskill.length == 0) {
                            errorObj.lang = "please select atleast one option for language english";
                            errorFlag++;
                        }
                    }
                    else {
                        if (lgskill.length == 0) {
                            errorObj.lang = "please select atleast one option for language guajrati";
                            errorFlag++;
                        }
                    }
                });
            }
            else {
                errorObj.lang = "";
            }
        }
        else {
            if (lang == "hindi") {
                if (lhskill == undefined) {
                    errorObj.lang = "please select atleast one option for language english";
                    errorFlag++;
                }

            }
            else if (lang == "english") {
                if (leskill == undefined) {
                    errorObj.lang = "please select atleast one option for language english";
                    errorFlag++;
                }

            }
            else {
                if (lgskill == undefined) {
                    errorObj.lang = "please select atleast one option for language gujarati";
                    errorFlag++;
                }
            }
        }
    }
    if (tech != undefined) {
        if (typeof tech != 'string') {
            if (tech.length != 0) {
                tech.forEach((element) => {
                    if (element == "php") {
                        if (tpskill == undefined) {
                            errorObj.tech = "please select your skill level in php";
                            errorFlag++;
                        }
                    }
                    else if (element == "Java") {
                        if (tjskill == undefined) {
                            errorObj.tech = "please select your skill level in java";
                            errorFlag++;
                        }
                    }
                    else {
                        if (toskill == undefined) {
                            errorObj.tech = "please select your skill level in oracle";
                            errorFlag++;
                        }
                    }
                });
            }
        }
        else {
            if (tech == "php") {
                if (tpskill == undefined) {
                    errorObj.tech = "please select your skill level in php";
                    errorFlag++;
                }
            }
            else if (tech == undefined) {
                if (tjskill == "") {
                    errorObj.tech = "please select your skill level in java";
                    errorFlag++;
                }
            }
            else {
                if (toskill == undefined) {
                    errorObj.tech = "please select your skill level in oracle";
                    errorFlag++;
                }
            }
        }
    }
    if (fname == "") {
        errorObj.fname = "please enter your first name";
        errorFlag++;
    }
    else if (!namePtn.test(fname)) {
        errorObj.fname = "your name should only contain characters";
        errorFlag++;
    }
    else {
        errorObj.fname = "";
    }
    if (lname == "") {
        errorObj.lname = "please enter your last name";
        errorFlag++;
    }
    else if (!namePtn.test(lname)) {
        errorObj.lname = "your name should only contain characters";
        errorFlag++;
    }
    else {
        errorObj.lname = "";
    }
    if (design == "") {
        errorObj.design = "please enter your designation";
        errorFlag++;
    }
    else {
        errorObj.design = "";
    }
    if (add1 == "") {
        errorObj.add1 = "please enter your address";
        errorFlag++;
    }
    else {
        errorObj.add1 = "";
    }
    if (email == "") {
        errorObj.email = "please enter your email";
        errorFlag++;
    }

    else {
        errorObj.email = "";
    }
    if (state == "") {
        errorObj.state = "Please enter your state name";
        errorFlag++;
    }
    else if (charPattern.test(state)) {
        errorObj.state = "digits are not allowed";
        errorFlag++;
    }
    else {
        errorObj.state = "";
    }
    if (city == "") {
        errorObj.city = "please enter your city name";
        errorFlag++;
    }
    else if (charPattern.test(city)) {
        errorObj.city = "only characters are allowed";
        errorFlag++;
    }
    else {
        errorObj.city = "";
    }
    if (zipcode == "") {
        errorObj.zipcode = "please enter your zipcode";
        errorFlag++;
    }
    if (phone == "") {
        errorObj.phone = "please enter your phone number";
        errorFlag++;
    }

    else {
        errorObj.phone = "";
    }
    if (ssc_boardname == "") {
        errorObj.ssc_boardname = "please enter your ssc course name";
        errorFlag++;
    }
    else if (charPattern.test(ssc_boardname)) {
        errorObj.ssc_boardname = "digits are not allowed";
        errorFlag++;
    }
    else {
        errorObj.ssc_boardname = "";
    }
    if (ssc_percent == "") {
        errorObj.ssc_percent = "please enter your ssc percent";
        errorFlag++;
    }

    else {
        errorObj.ssc_percent = "";
    }
    if (ssc_sname == "") {
        errorObj.ssc_sname = "please enter your school name";
        errorFlag++;
    }
    else if (charPattern.test(ssc_sname)) {
        errorObj.ssc_sname = "digits are not allowed";
        errorFlag++;
    }
    else {
        errorObj.ssc_sname = "";
    }
    if (ssc_pyear == "") {
        errorObj.ssc_pyear = "please enter your passing year";
        errorFlag++;
    }

    else {
        errorObj.ssc_pyear = "";
    }
    if (hsc_boardname == "") {
        errorObj.hsc_boardname = "please enter your course name";
        errorFlag++;
    }
    else if (charPattern.test(hsc_boardname)) {
        errorObj.hsc_boardname = "digits are not allowed";
        errorFlag++;
    }
    else {
        errorObj.hsc_boardname = "";
    }
    if (hsc_percent == "") {
        errorObj.hsc_percent = "please enter your percentage";
        errorFlag++;
    }

    else {
        errorObj.hsc_percent = "";
    }
    if (hsc_pyear == "") {
        errorObj.hsc_pyear = "please enter your passing year";
        errorFlag++;
    }

    else {
        errorObj.hsc_pyear = "";
    }
    if (hsc_sname == "") {
        errorObj.hsc_sname = "please enter your school name";
        errorFlag++;
    }
    else if (charPattern.test(hsc_sname)) {
        errorObj.hsc_sname = "digits are not allowed";
        errorFlag++;
    }
    else {
        errorObj.hsc_sname = "";
    }
    if (e_ctc == "") {
        errorObj.e_ctc = "please enter your expected ctc";
        errorFlag++;
    }

    else {
        errorObj.e_ctc = "";
    }
    if (c_ctc == "") {
        errorObj.c_ctc = "please enter your current ctc";
    }

    else {
        errorObj.c_ctc = "";
    }
    if (n_period == "") {
        errorObj.n_period = "please enter notice period";
        errorFlag++;
    }

    else {
        errorObj.n_period = "";
    }
    for(let i=0; i<cname.length; i++){
        if(cname[i]!=""){
            if(pos[i]=="" && from[i]=="" && to[i]==""){
                errorObj.experience="please fill all fields of experience";
                errorFlag++;
            }
        }
        if(pos[i]!=""){
            if(cname[i]=="" && from[i]=="" && to[i]==""){
                errorObj.experience="please fill all fields of experience";
                errorFlag++;
            }
        }
        if(from[i]!=""){
            if(cname[i]=="" && pos[i]=="" && to[i]==""){
                errorObj.experience="please fill all fields of experience";
                errorFlag++;
            }
        }
        if(to[i]!=""){
            if(cname[i]=="" && pos[i]=="" && from[i]==""){
                errorObj.experience="please fill all fields of experience";
                errorFlag++;
            }
        }
    }
    for(let i=0; i<ename.length; i++){
        if(ename[i]!=""){
            if(edesign[i]=="" && erelation[i]==""){
                errorObj.ref="please fill all fields of experience";
            }
        }
        if(edesign[i]!=""){
            if(ename[i]=="" && erelation[i]==""){
                errorObj.ref="please fill all fields of experience";
            }
        }
        if(erelation[i]!=""){
            if(edesign[i]=="" && ename[i]==""){
                errorObj.ref="please fill all fields of experience";
            }
        }
    }
    if (errorFlag != 0) {
        console.log(errorFlag);
        res.render('index', { dataObj: dataObj, errorObj: errorObj, isError: true, can:"",exp:"",edu:"",lang:"",tech:"",ref:"",pref:""});
    }
    else{
        let query1 = `update Candidate_Details set first_name="${fname}", last_name="${lname}", design="${design}", current_addreess="${add1}", permanent_address="${add2}", email="${email}", phone="${phone}", city="${city}" , state="${state}", gender="${gender}", zip_code="${zipcode}", relationship_status="${relation}" where candidate_id=${id};`;
        conn.query(query1,(err,result)=>{
              if(err) throw err;
              console.log("successfully update candidate details");
        });
        eduObj.forEach((element)=>{
            let query2=`update edu_master set course_name="${element[3]}", school_name="${element[4]}",passing_year="${element[1]}", percent=${element[2]} where candidate_id=${id} and course_type="${element[0]}";`;
            conn.query(query1,(err,result)=>{
              if(err) throw err;
              console.log("successfully update education details");
        });
        });

    console.log(langObj);
    console.log(techObj);
   if(langObj.length!=0){
    let keys = Object.keys(langObj);
    keys.forEach((element)=>{
        if(element=="hindi"){
            if(typeof langObj.hindi =='string'){
                let query3=`update language_details set language="${element}", lang_skill="${langObj.hidi}" where candidate_id=${id};`;
                conn.query(query3,(err,result)=>{
                    if(err) throw err;
                    console.log("successfully added lang");
              });
            }
            else{
                langObj.hindi.forEach((item)=>{
                    let query3=`update language_details set language="${element}", lang_skill="${item}" where candidate_id=${id};`;
                    conn.query(query3,(err,result)=>{
                        if(err) throw err;
                        console.log("successfully added lang");
                  });
                });
            }
        }
        if(element=="english"){
            if(typeof langObj.english =='string'){
                let query3=`update language_details set language="${element}", lang_skill="${langObj.english}" where candidate_id=${id};`;
                conn.query(query3,(err,result)=>{
                    if(err) throw err;
                    console.log("successfully added lang");
              });
            }
            else{
                langObj.english.forEach((item)=>{
                    let query3=`update language_details set language="${element}", lang_skill="${item}" where candidate_id=${id};`;
                    conn.query(query3,(err,result)=>{
                        if(err) throw err;
                        console.log("successfully added lang");
                  });
                });
            }
        }

        if(element=="gujararti"){
            if(typeof langObj.gujarati =='string'){
                let query3=`update language_details set language="${element}", lang_skill="${langObj.gujarati}" where candidate_id=${id};`;
                conn.query(query3,(err,result)=>{
                    if(err) throw err;
                    console.log("successfully added lang");
              });
            }
            else{
                langObj.gujarati.forEach((item)=>{
                    let query3=`update language_details set language="${element}", lang_skill="${item}" where candidate_id=${id};`;
                    conn.query(query3,(err,result)=>{
                        if(err) throw err;
                        console.log("successfully added lang");
                  });
                });
            }
        }
    });
   }

   if(techObj.length!=0){
    for(const [key,value] of Object.entries(techObj)){
        let query4=`update tech_details set tech="${key}" , tech_skill="${value}" where candidate_id=${id};`;
        conn.query(query4,(err,result)=>{
            if(err) throw err;
            console.log("successfully added tech");
      });
    }
   }

   if(cname!=undefined && design!=undefined && from!=undefined && to!=undefined){
    if(cname[0]!="" && pos[0]!="" && from[0]!="" && to[0]!=""){
        let query5=`update expreience set company_name="${cname[0]}", design="${pos[0]}", worked_from="${from[0]}", worked_till="${to[0]}" where candidate_id=${id};`;
        conn.query(query5,(err,result)=>{
            if(err) throw err;
            console.log("successfully added expereience");
      });
    }
   }

   if(ename!=undefined && edesign!=undefined && erelation!=undefined){
   if(ename[0]!="" && edesign[0]!="" && erelation[0]!=""){
     let query6=`update  e_reference set e_name="${ename[0]}", e_design="${edesign[0]}", e_relation="${erelation[0]}" where candidate_id=${id};`;
     conn.query(query6,(err,result)=>{
        if(err) throw err;
        console.log("successfully added references");
  });
   }
   }

   let query7=`update preference set prefered_location="${location}", notice_period="${n_period}", department="${design}", current_ctc=${c_ctc}, expected_ctc=${e_ctc} where candidate_id=${id};`;
   conn.query(query7,(err,result)=>{
    if(err) throw err;
    console.log("successfully added preferences");
});

  res.render('index',{ dataObj: "", errorObj: "", isError: false ,isUpdate:false, can:"",exp:"",edu:"",lang:"",tech:"",ref:"",pref:""});
  res.end();
    }
});
app.listen(8000);

