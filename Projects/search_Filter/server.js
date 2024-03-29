const express = require("express");
const conn = require("./mysql.js");
const queryString = require('querystring');
const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) => {
    res.render('index', { isPagi:false,pagination:"pagination",query:"", tables: "", result: "", showData: false, id: 1, limit: 0, pages: 0 ,isError:false,error:"" });
});
app.post("/", (req, res) => {
    let token = req.body.token;
    console.log(token);
    console.log(token.length);
    let student_id = [];
    let fname = [];
    let lname = [];
    let age = [];
    let pass = [];
    let contact = [];
    let gender = [];
    let email = [];
    let address = [];
    let hobby = [];
    let i = 0;
    while (i < token.length) {
        let j = i + 1;
        switch (token.charAt(i)) {
            case '_': {
                while ((token.charAt(j) != '_') && (token.charAt(j) != '&') && (token.charAt(j) != '$') && (token.charAt(j) != '^') && (token.charAt(j) != '#') && (token.charAt(j) != '=') && (token.charAt(j) != '+') && (token.charAt(j) != '%') && (token.charAt(j) != '/') && (token.charAt(j) != '*') && (j < token.length)) {
                    j++;
                    console.log(j);
                }
                let item = token.substring(i + 1, j);
                console.log(item);
                student_id.push(parseInt(item));
                i = j;
            }
                break;

            case '&': {
                while ((token.charAt(j) != '_') && (token.charAt(j) != '&') && (token.charAt(j) != '$') && (token.charAt(j) != '^') && (token.charAt(j) != '#') && (token.charAt(j) != '=') && (token.charAt(j) != '+') && (token.charAt(j) != '%') && (token.charAt(j) != '/') && (token.charAt(j) != '*') && (j < token.length)) {
                    j++;
                    console.log(j);
                }
                let item = token.substring(i + 1, j);
                console.log(item);
                fname.push(item);
                i = j;
            }
                break;
            case '$': {
                while ((token.charAt(j) != '_') && (token.charAt(j) != '&') && (token.charAt(j) != '$') && (token.charAt(j) != '^') && (token.charAt(j) != '#') && (token.charAt(j) != '=') && (token.charAt(j) != '+') && (token.charAt(j) != '%') && (token.charAt(j) != '/') && (token.charAt(j) != '*') && (j < token.length)) {
                    j++;
                    console.log(j);
                }
                let item = token.substring(i + 1, j);
                console.log(item);
                lname.push(item);
                i = j;
            }
                break;
            case '^': {
                while ((token.charAt(j) != '_') && (token.charAt(j) != '&') && (token.charAt(j) != '$') && (token.charAt(j) != '^') && (token.charAt(j) != '#') && (token.charAt(j) != '=') && (token.charAt(j) != '+') && (token.charAt(j) != '%') && (token.charAt(j) != '/') && (token.charAt(j) != '*') && (j < token.length)) {
                    j++;
                    console.log(j);
                }
                let item = token.substring(i + 1, j);
                console.log(item);
                age.push(parseInt(item));
                i = j;
            }
                break;
            case '#': {
                while ((token.charAt(j) != '_') && (token.charAt(j) != '&') && (token.charAt(j) != '$') && (token.charAt(j) != '^') && (token.charAt(j) != '#') && (token.charAt(j) != '=') && (token.charAt(j) != '+') && (token.charAt(j) != '%') && (token.charAt(j) != '/') && (token.charAt(j) != '*') && (j < token.length)) {
                    j++;
                    console.log(j);
                }
                let item = token.substring(i + 1, j);
                console.log(item);
                pass.push(item);
                i = j;
            }
                break;
            case '=': {
                while ((token.charAt(j) != '_') && (token.charAt(j) != '&') && (token.charAt(j) != '$') && (token.charAt(j) != '^') && (token.charAt(j) != '#') && (token.charAt(j) != '=') && (token.charAt(j) != '+') && (token.charAt(j) != '%') && (token.charAt(j) != '/') && (token.charAt(j) != '*') && (j < token.length)) {
                    j++;
                    console.log(j);
                }
                let item = token.substring(i + 1, j);
                console.log(item);
                contact.push(item);
                i = j;
            }
                break;
            case '+': {
                while ((token.charAt(j) != '_') && (token.charAt(j) != '&') && (token.charAt(j) != '$') && (token.charAt(j) != '^') && (token.charAt(j) != '#') && (token.charAt(j) != '=') && (token.charAt(j) != '+') && (token.charAt(j) != '%') && (token.charAt(j) != '/') && (token.charAt(j) != '*') && (j < token.length)) {
                    j++;
                    console.log(j);
                }
                let item = token.substring(i + 1, j);
                console.log(item);
                gender.push(item);
                i = j;
            }
                break;
            case '%': {
                while ((token.charAt(j) != '_') && (token.charAt(j) != '&') && (token.charAt(j) != '$') && (token.charAt(j) != '^') && (token.charAt(j) != '#') && (token.charAt(j) != '=') && (token.charAt(j) != '+') && (token.charAt(j) != '%') && (token.charAt(j) != '/') && (token.charAt(j) != '*') && (j < token.length)) {
                    j++;
                    console.log(j);
                }
                let item = token.substring(i + 1, j);
                console.log(item);
                email.push(item);
                i = j;
            }
                break;
            case '/': {
                while ((token.charAt(j) != '_') && (token.charAt(j) != '&') && (token.charAt(j) != '$') && (token.charAt(j) != '^') && (token.charAt(j) != '#') && (token.charAt(j) != '=') && (token.charAt(j) != '+') && (token.charAt(j) != '%') && (token.charAt(j) != '/') && (token.charAt(j) != '*') && (j < token.length)) {
                    j++;
                    console.log(j);
                }
                let item = token.substring(i + 1, j);
                console.log(item);
                address.push(item);
                i = j;
            }
                break;
            case '*': {
                while ((token.charAt(j) != '_') && (token.charAt(j) != '&') && (token.charAt(j) != '$') && (token.charAt(j) != '^') && (token.charAt(j) != '#') && (token.charAt(j) != '=') && (token.charAt(j) != '+') && (token.charAt(j) != '%') && (token.charAt(j) != '/') && (token.charAt(j) != '*') && (j < token.length)) {
                    j++;
                    console.log(j);
                }
                let item = token.substring(i + 1, j);
                console.log(item);
                hobby.push(item);
                i = j;
            }
                break;

        }
    }


    // while (i < token.length) {
    //     let j = i + 1;
    //     if (token.charAt(i) == '_') {
    //         while (token.charAt(j) != '_' && j < token.length) {
    //             j++;
    //         }
    //         let item = token.substring(i + 1, j);
    //         console.log(item);
    //         student_id.push(item);
    //         i = j;
    //     }
    // }

    const dataObj = new Object();
    if (student_id.length != 0) {
        dataObj.student_id = student_id;
    }
    if (fname.length != 0) {
        dataObj.fname = fname;
    }
    if (lname.length != 0) {
        dataObj.lname = lname;
    }
    if (age.length != 0) {
        dataObj.age = age;
    }
    if (pass.length != 0) {
        dataObj.pass = pass;
    }
    if (contact.length != 0) {
        dataObj.contact = contact;
    }
    if (gender.length != 0) {
        dataObj.gender = gender;
    }
    if (email.length != 0) {
        dataObj.email = email;
    }
    if (address.length != 0) {
        dataObj.address = address;
    }
    if (hobby.length != 0) {
        dataObj.hobby = hobby;
    }

    console.log(fname);
    console.log(lname);
    console.log(age);
    console.log(dataObj);
    let txt = `select * from student_detail where  `;
    //    if(student_id.length!=0){
    //     if(student_id==1){
    //         txt+=`student_id like "%${student_id[0]}%" and`
    //     }
    //     else{
    //        for(let i=0; i<student_id.length; i++){
    //         if(i<student_id.length-1){
    //             txt+=`student_id like "%${student_id[i]}% or"`
    //         }
    //        }
    //     }
    //    }
    let k = 0;
    for (const [key, value] of Object.entries(dataObj)) {

        console.log(k);
        if (key != "student_id" && key != "age") {
            if (value.length == 1) {
                txt += `${key} like ` +`'%${value[0]}%'` ;
            }
            else {
                for (let i = 0; i < value.length; i++) {
                    if (i < value.length - 1) {
                        txt += `${key} like `+`'%${value[i]}%'`+`or `;
                    }
                    else {
                        txt += `${key} like `+`'%${value[i]}%'`;
                    }
                }
            }
            txt += ' and ';
        }
        else {
            if (value.length == 1) {
                txt += `${key} = ${value[0]} `
            }
            else {
                for (let i = 0; i < value.length; i++) {
                    if (i < value.length - 1) {
                        txt += `${key} = ${value[i]} or `
                    }
                    else {
                        txt += `${key} = ${value[i]} `
                    }
                }
            }
            txt += ' and ';
        }
    }
    let query = txt.substring(0, txt.length - 4);
    console.log(query);
    conn.query(`${query} ;`, (err, result) => {
        if(result){
        console.log(result);
        let len = result.length;
        let limit = 10;
        if (len < limit) {
            res.render('index', {isPagi:false,pagination:"pagination", query:query, tables: 'tables', result: result, showData: true, id: 1, limit: 0, pages: 0,isError:false,error:""  });
            res.end();
        }
        else {
            let id = 1;
            let startIdx = (id - 1) * limit;
            let pages = Math.ceil(len / limit);
            conn.query(`${query} limit ${limit} offset ${startIdx} ;`, (err, result) => {
                res.render('index', { isPagi:true, pagination:"pagination", query:query,tables: 'tables', result: result, showData: true, id: id, limit: limit, pages: pages ,isError:false,error:"" });
                res.end();
            });
        }

    }
    else{

        res.render('index',{isPagi:false,pagination:"",query:"",tables:"",result:"",showData:false,id:0,limit:0,pages:0,isError:true,error:"error"});
    }
    });
});

app.get('/data',(req,res)=>{
    console.log(req.query);
    let id = parseInt(req.query.id);
    let limit= parseInt(req.query.limit);
    let pages=parseInt(req.query.pages);
    let query=(req.query.query);
    let startIdx=(id-1)*limit;
    conn.query(`${query} limit ${limit} offset ${startIdx} ;`, (err, result) => {
        if(result){
            res.render('index', { isPagi:true, pagination:"pagination", query:query, tables:'tables', result:result, showData:true, id:id, limit:limit, pages:pages, isError:false, error:"" });
            res.end();
        }
        else{
            console.log(err);
            res.render('index',{isPagi:false,pagination:"",query:"",tables:"",result:"",showData:false,id:0,limit:0,pages:0,isError:true,error:"error"});
        }
});
});
app.get('/query',(req,res)=>{
    let query=req.query.query;
    console.log(query);
    res.send("hello");
});
app.listen(5000);
