const conn = require('../mysql');
const showStudentDetails = async (startIndex) => {
    return promise = new Promise((resolve, reject) => {
        conn.query(`select * from student_master limit 250 offset ${startIndex};`, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

const ascStudentDetail = async (startIndex) => {
    return promise = new Promise((resolve, reject) => {
        conn.query(`select * from student_master order by student_city limit 250 offset ${startIndex};`, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}
const descStudentDetail = async (startIndex) => {
    return promise = new Promise((resolve, reject) => {
        conn.query(`select * from student_master  order by student_city desc limit 250 offset ${startIndex}; `, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}
module.exports = { showStudentDetails, ascStudentDetail, descStudentDetail };