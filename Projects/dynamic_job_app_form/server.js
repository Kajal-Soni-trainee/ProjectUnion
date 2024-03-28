const express = require('express');
var cors = require('cors');
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
const fs = require('fs');
const conn = require('./mysql.js');
app.set('view engine', 'ejs');
app.use(express.json());
const path = require('path');
let filename = path.join(__dirname, 'views');
var corsMiddleware = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'localhost'); //replace localhost with actual host
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, PATCH, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization');
    next();
}

app.use(corsMiddleware);
app.get('/', (req, res) => {
    console.log("data");
    let query = 'select * from states';
    let result=[];
    result.push(
        {
            first_name:"",
            last_name:"",
            design:"",
            current_addreess:"",
            permanent_address:"",
            email:"",
            phone:"",
            city:"",
            state:"",
            gender:"",
            zip_code:"",
            relationship_status:""
        }
    );
    conn.query(query, (err, result1) => {
        if (err) throw err;
        res.render('index', { result:result, result1: result1, isUpdate: false });
        res.end();
    })
});
app.get('/action', (req, res) => {
    console.log("hello");
    let action = req.query.action;
    let id = parseInt(req.query.id);
    let table = req.query.table;
    let field = req.query.field;
    if (action == 'fetch') {
        let query = `select * from ${table} where ${field}=${id};`;
        conn.query(query, (err, data) => {
            if (err) throw err;
            res.json({ data: data });
        });
    }
});
app.get('/candidate', (req, res) => {
    let fname = req.query.fname;
    let lname = req.query.lname;
    let design = req.query.design;
    let state = req.query.state;
    let city = req.query.city;
    let gender = req.query.gender;
    let contact = req.query.contact;
    let add1 = req.query.add1;
    let add2 = req.query.add2;
    let relation = req.query.relation;
    let email = req.query.email;
    let zipcode = req.query.zipcode;
    console.log(fname);
    let sqlfunc = async () => {
        return promise = new Promise((resolve, reject) => {
            let query = `insert into Candidate_Details (first_name, last_name,design, current_addreess, permanent_address, email, phone, city, state, gender, zip_code, relationship_status ) values ("${fname}","${lname}","${design}","${add1}","${add2}","${email}",${contact},"${city}","${state}","${gender}",${zipcode},"${relation}");`;
            console.log(query);
            conn.query(query, (err, result) => {
                if (err) throw err;
                resolve(result.insertId);
            });
        });
    }
    async function getUserId() {
        let userId = await sqlfunc();
        fs.readFile(`${filename}/education_details.ejs`, 'utf-8', function (err, data) {
            if (err) throw err;
            res.json({ data: data, userId: userId });
        });
    }
    getUserId();
});
app.get('/edu', (req, res) => {
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

    let query1 = `select * from edu_master where candidate_id=${userId};`;
    conn.query(query1, (err, result) => {
        if (err) throw err;
        if (!result || result.length == 0) {
            eduObj.forEach((element) => {
                let query2 = `insert into edu_master (candidate_id, course_type, passing_year, percent,course_name,school_name) values(${userId},"${element[0]}","${element[1]}",${element[2]},"${element[3]}","${element[4]}")`;
                conn.query(query2, (err, result) => {
                    if (err) throw err;
                    console.log("inserted");
                });
            });

        }
        else {
            eduObj.forEach((element) => {
                let query2 = `update edu_master set course_name="${element[3]}", school_name="${element[4]}",passing_year="${element[1]}", percent=${element[2]} where candidate_id=${userId} and course_type="${element[0]}";`;
                conn.query(query1, (err, result) => {
                    if (err) throw err;
                    console.log("successfully update education details");
                });
            });
        }
    });
    let query2 = `select * from language_details where candidate_id=${userId};`;
    conn.query(query2, (err, result) => {
        if (err) throw err;
        fs.readFile(`${filename}/language_details.ejs`, 'utf-8', function (err, data) {
            if (err) throw err;
            res.json({ data: data, userId: userId, result: result });
        });
    });
});

app.get('/lang_detail', (req, res) => {
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
    let query1 = `select * from tech_details where candidate_id=${userId};`;
    conn.query(query1, (err, result) => {
        if (err) throw err;
        if (!result || result.length == 0) {
            for (let [key, value] of Object.entries(langObj)) {
                value.forEach((element) => {
                    let query = `insert into language_details (candidate_id, language, lang_skill) values (${userId},"${key}","${element}");`;
                    conn.query(query, (err, result) => {
                        if (err) throw err;
                        console.log("success fully inserted");
                    });
                })
            }
        }
        else {
            for (let [key, value] of Object.entries(langObj)) {
                value.forEach((element) => {
                    let query = `update language_details set language="${key}", lang_skill="${element}" where candidate_id=${userId};`;
                    conn.query(query, (err, result) => {
                        if (err) throw err;
                        console.log("success fully updated");
                    });
                })
            }
        }
    });

    let query2 = `select * from tech_details where candidate_id=${userId};`;
    conn.query(query2, (err, result) => {
        if (err) throw err;
        console.log(result);
        fs.readFile(`${filename}/technology_details.ejs`, 'utf-8', function (err, data) {
            if (err) throw err;
            res.json({ data: data, userId: userId, result: result });
        });
    });
});


app.get('/tech_detail', (req, res) => {
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
    let query1 = `select * from tech_details where candidate_id=${userId};`;
    conn.query(query1, (err, result) => {
        if (err) throw err;
        if (!result || result.length == 0) {
            for (let [key, value] of Object.entries(techObj)) {
                let query = `insert into tech_details (candidate_id, tech, tech_skill) values(${userId},"${key}","${value}");`;
                conn.query(query, (err, result) => {
                    if (err) throw err;
                    console.log("inserted successfully");
                });
            }
        }
        else {
            for (let [key, value] of Object.entries(techObj)) {
                let query = `update tech_details set tech="${key}", tech_skill="${value}" where candidate_id=${userId};`;
                conn.query(query, (err, result) => {
                    if (err) throw err;
                    console.log("updated successfully");
                });
            }
        }
    });

    let query2 = `select * from expreience where candidate_id=${userId};`;
    conn.query(query2, (err, result) => {
        if (err) throw err;
        fs.readFile(`${filename}/experience.ejs`, 'utf-8', function (err, data) {
            if (err) throw err;
            res.json({ data: data, userId: userId, result: result });
        });
    });

});

app.get('/exp_detail', (req, res) => {
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

    let query1 = `select * from expreience where candidate_id=${userId};`;
    conn.query(query1, (err, result) => {
        if (err) throw err;
        if (!result || result.length == 0) {
            expObj.forEach((element) => {
                let query = `insert into expreience (candidate_id,company_name,design,worked_from,worked_till) values(${userId},"${element[0]}}","${element[1]}","${element[2]}","${element[3]}");`;
                conn.query(query, (err, result) => {
                    if (err) throw err;
                    console.log("inserted successfully");
                });
            });
        }
        else {
            expObj.forEach((element) => {
                let query = `update expreience set company_name="${element[0]}", design="${element[1]}", worked_from="${element[2]}", worked_till="${element[3]}" where candidate_id=${userId};`;
                conn.query(query, (err, result) => {
                    if (err) throw err;
                    console.log("updated successfully");
                });
            });
        }
    });
    let query2 = `select * from preference where candidate_id=${userId};`;
    conn.query(query2, (err, result) => {
        if (err) throw err;
        fs.readFile(`${filename}/preferences.ejs`, 'utf-8', function (err, data) {
            if (err) throw err;
            res.json({ data: data, userId: userId, result: result });
        });
    });

});
app.get('/pref_detail', (req, res) => {
    let userId = req.query.userId;
    let location = req.query.location;
    let c_ctc = req.query.c_ctc;
    let e_ctc = req.query.e_ctc;
    let n_period = req.query.n_period;
    let design = 'jr developer';
    let query1 = `select * from preference where candidate_id=${userId};`;
    conn.query(query1, (err, result) => {
        if (err) throw err;
        if (!result || result.length == 0) {
            let query = `insert into preference(candidate_id,prefered_location,notice_period,department,current_ctc,expected_ctc) values (${userId},"${location}","${n_period}","${design}",${c_ctc},${e_ctc});`;
            conn.query(query, (err, result) => {
                if (err) throw err;
            });
        }
        else {
            let query = `update preference set prefered_location="${location}", notice_period="${n_period}",department="${design}", current_ctc=${c_ctc} , expected_ctc=${e_ctc};`;
            conn.query(query, (err, result) => {
                if (err) throw err;
            });
        }
    });
    let query2=`select * from e_reference where candidate_id=${userId};`;
    conn.query(query2,(err,result)=>{
        if(err) throw err;
        fs.readFile(`${filename}/references.ejs`, 'utf-8', function (err, data) {
            if (err) throw err;
            res.json({ data: data, userId: userId ,result:result});
        });
    });
    });


    app.get('/ref_detail', (req, res) => {
        let userId = req.query.userId;

        let ename = req.query.ename;

        let edesign = req.query.edesign;

        let erelation = req.query.erelation;
      
        let query2=`select * from e_reference where candidate_id=${userId};`;
        conn.query(query2,(err,result)=>{
            if(err) throw err;
            if(!result|| result.length==0){
                let query = `insert into e_reference(candidate_id, e_name, e_design, e_relation) values(${userId},"${ename}","${edesign}","${erelation}");`;
                conn.query(query, (err, result) => {
                    if (err) throw err;
                });
            }
           else{
           let query=`update e_reference set e_name="${ename}",e_design="${edesign}", e_relation="${erelation}";`;
            conn.query(query, (err, result) =>{
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
                res.json({ data: data, result:result });
            });
        });
    });
    
    app.get('/pref_detail_pre',(req,res)=>{
        let userId = req.query.userId;
        let query = `select * from preference where candidate_id=${userId};`;
        conn.query(query, (err, result) => {
            console.log(result);
            if (err) throw err;
            fs.readFile(`${filename}/preferences.ejs`, 'utf-8', function (err, data) {
                if (err) throw err;
                res.json({ data: data, result: result });
            });
        });
    });
    app.get('/exp_detail_prev', (req, res) => {
        let userId = req.query.userId;
        let query = `select * from expreience where candidate_id=${userId};`;
        conn.query(query, (err, result) => {
            console.log(result);
            if (err) throw err;
            fs.readFile(`${filename}/experience.ejs`, 'utf-8', function (err, data) {
                if (err) throw err;
                res.json({ data: data, result: result });

            });
        });
    });

    app.get('/tech_detail_prev', (req, res) => {
        let userId = req.query.userId;
        let query = `select * from tech_details where candidate_id=${userId};`;
        conn.query(query, (err, result) => {
            console.log(result);
            if (err) throw err;
            fs.readFile(`${filename}/technology_details.ejs`, 'utf-8', function (err, data) {
                if (err) throw err;
                res.json({ data: data, result: result });
            });
        });
    });

    app.get('/lang_detail_prev', (req, res) => {
        let userId = req.query.userId;
        let query = `select * from language_details where candidate_id=${userId};`;
        conn.query(query, (err, result) => {
            console.log(result);
            if (err) throw err;
            fs.readFile(`${filename}/language_details.ejs`, 'utf-8', function (err, data) {
                if (err) throw err;
                res.json({ data: data, result: result });
            });
        });
    });

    app.get('/edu_detail_prev', (req, res) => {
        let userId = req.query.userId;
        let query = `select * from edu_master where candidate_id=${userId};`;
        conn.query(query, (err, result) => {
            console.log(result);
            if (err) throw err;
            fs.readFile(`${filename}/education_details.ejs`, 'utf-8', function (err, data) {
                if (err) throw err;
                res.json({ data: data, result: result });
            });
        });
    });

    app.get('/can_detail_prev', (req, res) => {
        let userId = req.query.userId;
        let query = `select * from Candidate_Details where candidate_id=${userId};`;
        conn.query(query, (err, result) => {
            console.log(result);
            if (err) throw err;
            let query1 = 'select * from states';
            conn.query(query1, (err, result1) => {
                if (err) throw err;
                fs.readFile(`${filename}/candidate_details.ejs`, 'utf-8', function (err, data) {
                    if (err) throw err;
                    res.json({ data: data, result: result, result1: result1 });
                });
            });

        });
    });

    app.get('/update', (req, res) => {
        let id = req.query.id;
        let query = `select * from Candidate_Details where candidate_id=${id};`;
        conn.query(query, (err, result) => {
            console.log(result);
            if (err) throw err;
            let query1 = 'select * from states';
            conn.query(query1, (err, result1) => {
                if (err) throw err;
                res.render('index', { result: result, result1: result1, isUpdate: true });
                res.end();
            });
        });
    });

    app.get('/list', (req, res) => {
        let query = 'select * from Candidate_Details;';
        conn.query(query, (err, result) => {
            if (err) throw err;
            res.render('list', { result: result });
        });
    });

    app.get('/update_candidate', (req, res) => {
        let id = req.query.id;
        let fname = req.query.fname;
        let lname = req.query.lname;
        let design = req.query.design;
        let state = req.query.state;
        let city = req.query.city;
        let gender = req.query.gender;
        let contact = req.query.contact;
        let add1 = req.query.add1;
        let add2 = req.query.add2;
        let relation = req.query.relation;
        let email = req.query.email;
        let zipcode = req.query.zipcode;
        let query1 = `update Candidate_Details set first_name="${fname}", last_name="${lname}", design="${design}", current_addreess="${add1}", permanent_address="${add2}", email="${email}", phone="${contact}", city="${city}" , state="${state}", gender="${gender}", zip_code="${zipcode}", relationship_status="${relation}" where candidate_id=${id};`;
        conn.query(query1, (err, result) => {
            if (err) throw err;
            console.log("successfully update candidate details");
            let query2 = `select * from edu_master where candidate_id=${id};`;
            conn.query(query2, (err, result1) => {
                if (err) throw err;
                fs.readFile(`${filename}/education_details.ejs`, 'utf-8', function (err, data) {
                    if (err) throw err;
                    res.json({ data: data, result1: result1,userId:id });
                });
            })

        });
    });
    app.listen(8000);