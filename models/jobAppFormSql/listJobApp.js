const conn = require('../../mysql');

async function fetch_Can_Details() {
    return promise = new Promise((resolve, reject) => {
        let query = 'select * from Candidate_Details;';
        conn.query(query, (err, result) => {
            if (err) throw err;
            resolve(result);
        });
    })
}
s
async function fetch_Edu_Detail() {
    return promise = new Promise((resolve, reject) => {
        let query = 'select * from edu_master;';
        conn.query(query, (err, result) => {
            if (err) throw err;
            resolve(result);
        });
    })
}

async function fetch_Exp_Details() {
    return promise = new Promise((resolve, reject) => {
        let query = 'select * from expreience;';
        conn.query(query, (err, result) => {
            if (err) throw err;
            resolve(result);
        });
    })
}

async function fetch_Ref_Details() {
    return promise = new Promise((resolve, reject) => {
        let query = 'select * from e_reference;';
        conn.query(query, (err, result) => {
            if (err) throw err;
            resolve(result);
        });
    });
}

async function fetch_Pref_Details() {
    return promise = new Promise((resolve, reject) => {
        let query = 'select * from preference;';
        conn.query(query, (err, result) => {
            if (err) throw err;
            resolve(result);
        });
    })
}

async function fetch_Lang_Details() {
    return promise = new Promise((resolve, reject) => {
        let query = 'select * from language_details;';
        conn.query(query, (err, result) => {
            if (err) throw err;
            resolve(result);
        });
    })
}
async function fetch_Tech_Details() {
    return promise = new Promise((resolve, reject) => {
        let query = 'select * from tech_details;';
        conn.query(query, (err, result) => {
            if (err) throw err;
            resolve(result);
        });
    })
}

module.exports = { fetch_Can_Details, fetch_Edu_Detail, fetch_Exp_Details, fetch_Ref_Details, fetch_Pref_Details, fetch_Lang_Details, fetch_Tech_Details };