const conn = require('../mysql');
const insertStudentDetails = async (obj) => {
    const fname = obj.fname;
    const lname = obj.lname;
    const age = obj.age;
    const pass = obj.pass;
    const con = obj.con;
    const gen = obj.gen;
    const hobby = obj.hobbies;
    const email = obj.email;
    const add = obj.add;

    return promise = new Promise((resolve, reject) => {
        let query = `insert into student_detail(fname,lname,age , pass, contact, gender,hobby,email,address) values ("${fname}",
        "${lname}",${parseInt(age)},"${pass}","${con}","${gen}","${hobby}","${email}","${add}")`;
        conn.query(query, (err, result) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(result);
            }
        });
    });
}

const validateUserLogin = async (obj) => {
    let email = obj.email;
    let pass = obj.pass;
    return promise = new Promise((resolve, reject) => {
        let query = `select * from student_detail where email="${email}" and pass="${pass}"`;
        conn.query(query, (err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
}

const updateUserSql = async (obj) => {
    let fname = obj.fname;
    let lname = obj.lname;
    let age = obj.age;
    let pass = obj.pass;
    let con = obj.con;
    let gen = obj.gen;
    let hobbies = obj.hobbies;
    let email = obj.email;
    let add = obj.add;
    let id = req.body.id;
    return promise = new Promise((resolve, reject) => {
        let query = `update student_detail set fname="${fname}", lname="${lname}",age="${age}",pass="${pass}", contact="${con}",gender="${gen}",hobby="${hobbies}", email="${email}", address="${add}" where student_id=${id}`;
        conn.query(query, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    });
}


module.exports = { insertStudentDetails, validateUserLogin, updateUserSql };