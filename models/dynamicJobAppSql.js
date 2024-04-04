const conn = require('../mysql');

const insertCandidateDetails = async (obj) => {
    let fname = obj.fname;
    let lname = objlname;
    let design = obj.design;
    let state = obj.state;
    let city = obj.city;
    let gender = obj.gender;
    let contact = obj.contact;
    let add1 = obj.add1;
    let add2 = obj.add2;
    let relation = obj.relation;
    let email = obj.email;
    let zipcode = obj.zipcode;

    return promise = new Promise((resolve, reject) => {
        let query = `insert into Candidate_Details (first_name, last_name,design, current_addreess, permanent_address, email, phone, city, state, gender, zip_code, relationship_status ) values ("${fname}","${lname}","${design}","${add1}","${add2}","${email}",${contact},"${city}","${state}","${gender}",${zipcode},"${relation}");`;
        console.log(query);
        conn.query(query, (err, result) => {
            if (err) throw err;
            resolve(result.insertId);
        });
    })
}
const insertEducationDetails = async (eduObj) => {
    eduObj.forEach((element) => {
        return promise = new Promise((resolve, reject) => {
            let query = `insert into edu_master (candidate_id, course_type, passing_year, percent,course_name,school_name) values(${userId},"${element[0]}","${element[1]}",${element[2]},"${element[3]}","${element[4]}")`;
            conn.query(query, (err, result) => {
                if (err) reject(err);
                resolve(err);
            });
        });
    });
}
const updateEducationDetails = async (eduObj) => {
    eduObj.forEach((element) => {
        return promise = new Promise((resolve, reject) => {
            let query = `update edu_master set course_name="${element[3]}", school_name="${element[4]}",passing_year="${element[1]}", percent=${element[2]} where candidate_id=${userId} and course_type="${element[0]}";`;
            conn.query(query, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        })
    })
}

const insertLanguageDetails = (langObj) => {
    for (let [key, value] of Object.entries(langObj)) {
        value.forEach((element) => {
            return promise = new Promise((resolve, reject) => {
                let query = `insert into language_details (candidate_id, language, lang_skill) values (${userId},"${key}","${element}");`;
                conn.query(query, (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                });
            })

        })
    }
}

const updateLanguageDetails = (langObj) => {
    for (let [key, value] of Object.entries(langObj)) {
        value.forEach((element) => {
            return promise = new Promise((resolve, reject) => {
                let query = `update language_details set language="${key}", lang_skill="${element}" where candidate_id=${userId};`;
                conn.query(query, (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                });
            });

        })
    }
}

const insertTechDetails = async (techObj) => {
    for (let [key, value] of Object.entries(techObj)) {
        return promise = new Promise((resolve, reject) => {
            let query = `insert into tech_details (candidate_id, tech, tech_skill) values(${userId},"${key}","${value}");`;
            conn.query(query, (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
        })

    }
}

const updateTechDetails = async (techObj) => {
    for (let [key, value] of Object.entries(techObj)) {
        return promise = new Promise((resolve, reject) => {
            let query = `update tech_details set tech="${key}", tech_skill="${value}" where candidate_id=${userId};`;
            conn.query(query, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        })

    }
}
const insertExpDetails = (expObj) => {
    expObj.forEach((element) => {
        return promise = new Promise((resolve, reject) => {
            let query = `insert into expreience (candidate_id,company_name,design,worked_from,worked_till) values(${userId},"${element[0]}}","${element[1]}","${element[2]}","${element[3]}");`;
            conn.query(query, (err, result) => {
                if (err) reject(err);
                resolve(result);
                console.log("inserted successfully");
            });
        })
    });
}
const updateExpDetails = (expObj) => {
    expObj.forEach((element) => {
        return promise = new Promise((resolve, reject) => {
            let query = `update expreience set company_name="${element[0]}", design="${element[1]}", worked_from="${element[2]}", worked_till="${element[3]}" where candidate_id=${userId};`;
            conn.query(query, (err, result) => {
                if (err) reject(err);
                resolve(result);
                console.log("updated successfully");
            });
        })
    });
}
const insertPref = (obj) => {
    let userId = obj.userId;
    let location = obj.location;
    let c_ctc = obj.c_ctc;
    let e_ctc = obj.e_ctc;
    let n_period = obj.n_period;
    let design = 'jr developer';
    return promise = new Promise((resolve, reject) => {
        let query = `insert into preference(candidate_id,prefered_location,notice_period,department,current_ctc,expected_ctc) values (${userId},"${location}","${n_period}","${design}",${c_ctc},${e_ctc});`;
        conn.query(query, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    })

}
const updatePref = (obj) => {
    let userId = obj.userId;
    let location = obj.location;
    let c_ctc = obj.c_ctc;
    let e_ctc = obj.e_ctc;
    let n_period = obj.n_period;
    let design = 'jr developer';
    return promise = new Promise((resolve, reject) => {
        let query = `update preference set prefered_location="${location}", notice_period="${n_period}",department="${design}", current_ctc=${c_ctc} , expected_ctc=${e_ctc};`;
        conn.query(query, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    })
}
module.exports = {
    insertCandidateDetails, insertEducationDetails, updateEducationDetails, insertLanguageDetails,
    updateLanguageDetails, insertTechDetails, updateTechDetails, insertExpDetails, updateExpDetails,
    insertPref, updatePref
};