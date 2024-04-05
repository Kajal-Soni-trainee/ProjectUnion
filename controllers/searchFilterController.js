const conn = require('../mysql')

const generateQuery = (req, res) => {
    let token = req.query.token;
    console.log("mytoken" + token);
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
                while ((token.charAt(j) != '_') && (token.charAt(j) != '&') && (token.charAt(j) != '$') && (token.charAt(j) != '^') && (token.charAt(j) != '#') && (token.charAt(j) != '=') && (token.charAt(j) != '!') && (token.charAt(j) != '%') && (token.charAt(j) != '/') && (token.charAt(j) != '*') && (j < token.length)) {
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
                while ((token.charAt(j) != '_') && (token.charAt(j) != '&') && (token.charAt(j) != '$') && (token.charAt(j) != '^') && (token.charAt(j) != '#') && (token.charAt(j) != '=') && (token.charAt(j) != '!') && (token.charAt(j) != '%') && (token.charAt(j) != '/') && (token.charAt(j) != '*') && (j < token.length)) {
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
                while ((token.charAt(j) != '_') && (token.charAt(j) != '&') && (token.charAt(j) != '$') && (token.charAt(j) != '^') && (token.charAt(j) != '#') && (token.charAt(j) != '=') && (token.charAt(j) != '!') && (token.charAt(j) != '%') && (token.charAt(j) != '/') && (token.charAt(j) != '*') && (j < token.length)) {
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
                while ((token.charAt(j) != '_') && (token.charAt(j) != '&') && (token.charAt(j) != '$') && (token.charAt(j) != '^') && (token.charAt(j) != '#') && (token.charAt(j) != '=') && (token.charAt(j) != '!') && (token.charAt(j) != '%') && (token.charAt(j) != '/') && (token.charAt(j) != '*') && (j < token.length)) {
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
                while ((token.charAt(j) != '_') && (token.charAt(j) != '&') && (token.charAt(j) != '$') && (token.charAt(j) != '^') && (token.charAt(j) != '#') && (token.charAt(j) != '=') && (token.charAt(j) != '!') && (token.charAt(j) != '%') && (token.charAt(j) != '/') && (token.charAt(j) != '*') && (j < token.length)) {
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
                while ((token.charAt(j) != '_') && (token.charAt(j) != '&') && (token.charAt(j) != '$') && (token.charAt(j) != '^') && (token.charAt(j) != '#') && (token.charAt(j) != '=') && (token.charAt(j) != '!') && (token.charAt(j) != '%') && (token.charAt(j) != '/') && (token.charAt(j) != '*') && (j < token.length)) {
                    j++;
                    console.log(j);
                }
                let item = token.substring(i + 1, j);
                console.log(item);
                contact.push(item);
                i = j;
            }
                break;
            case '!': {
                while ((token.charAt(j) != '_') && (token.charAt(j) != '&') && (token.charAt(j) != '$') && (token.charAt(j) != '^') && (token.charAt(j) != '#') && (token.charAt(j) != '=') && (token.charAt(j) != '!') && (token.charAt(j) != '%') && (token.charAt(j) != '/') && (token.charAt(j) != '*') && (j < token.length)) {
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
                while ((token.charAt(j) != '_') && (token.charAt(j) != '&') && (token.charAt(j) != '$') && (token.charAt(j) != '^') && (token.charAt(j) != '#') && (token.charAt(j) != '=') && (token.charAt(j) != '!') && (token.charAt(j) != '%') && (token.charAt(j) != '/') && (token.charAt(j) != '*') && (j < token.length)) {
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
                while ((token.charAt(j) != '_') && (token.charAt(j) != '&') && (token.charAt(j) != '$') && (token.charAt(j) != '^') && (token.charAt(j) != '#') && (token.charAt(j) != '=') && (token.charAt(j) != '!') && (token.charAt(j) != '%') && (token.charAt(j) != '/') && (token.charAt(j) != '*') && (j < token.length)) {
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
                while ((token.charAt(j) != '_') && (token.charAt(j) != '&') && (token.charAt(j) != '$') && (token.charAt(j) != '^') && (token.charAt(j) != '#') && (token.charAt(j) != '=') && (token.charAt(j) != '!') && (token.charAt(j) != '%') && (token.charAt(j) != '/') && (token.charAt(j) != '*') && (j < token.length)) {
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

    let k = 0;
    for (const [key, value] of Object.entries(dataObj)) {

        console.log(k);
        if (key != "student_id" && key != "age") {
            if (value.length == 1) {
                txt += `${key} like ` + `'%${value[0]}%'`;
            }
            else {
                for (let i = 0; i < value.length; i++) {
                    if (i < value.length - 1) {
                        txt += `${key} like ` + `'%${value[i]}%'` + `or `;
                    }
                    else {
                        txt += `${key} like ` + `'%${value[i]}%'`;
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
    conn.query(`${query};`, (err, result) => {
        if (err) {
            console.log(err);
            conn.query('select * from student_detail;', (err, result1) => {
                res.json({ result: result1 });
            })
        }
        else {

            res.json({ result: result });
            res.end();
        }

    });
}

module.exports = { generateQuery };