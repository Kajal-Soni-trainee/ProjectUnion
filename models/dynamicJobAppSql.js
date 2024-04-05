const conn = require('../mysql');

const insertCandidateDetails = async (obj) => {
    let fname = obj.fname;
    let lname = obj.lname;
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
const insertEducationDetails = async (eduObj, userId) => {

    return promise = new Promise((resolve, reject) => {
        eduObj.forEach((element) => {
            let query = `insert into edu_master (candidate_id, course_type, passing_year, percent,course_name,school_name) values(${userId},"${element[0]}","${element[1]}",${element[2]},"${element[3]}","${element[4]}")`;
            conn.query(query, (err, result) => {
                if (err) reject(err);
                console.log(result);
            });
        });
        resolve("success");
    });

}
const updateEducationDetails = async (eduObj, userId) => {

    return promise = new Promise((resolve, reject) => {
        eduObj.forEach((element) => {
            let query = `update edu_master set course_name="${element[3]}", school_name="${element[4]}",passing_year="${element[1]}", percent=${element[2]} where candidate_id=${userId} and course_type="${element[0]}";`;
            conn.query(query, (err, result) => {
                if (err) reject(err);
                console.log(result);
            });
        })
        resolve("success");
    })
}

const insertLanguageDetails = (langObj, userId) => {
    return promise = new Promise((resolve, reject) => {
        for (let [key, value] of Object.entries(langObj)) {
            value.forEach((element) => {
                let query = `insert into language_details (candidate_id, language, lang_skill) values (${userId},"${key}","${element}");`;
                conn.query(query, (err, result) => {
                    if (err) reject(err);
                    console.log(result);
                });
            })
        }
        resolve("success");
    });
}

const updateLanguageDetails = (langObj, userId) => {
    return promise = new Promise((resolve, reject) => {
        for (let [key, value] of Object.entries(langObj)) {
            value.forEach((element) => {
                let query = `update language_details set language="${key}", lang_skill="${element}" where candidate_id=${userId};`;
                conn.query(query, (err, result) => {
                    if (err) reject(err);
                    console.log(result);
                });
            });
        }
        resolve(result);
    })
}


const insertTechDetails = async (techObj, userId) => {
    return promise = new Promise((resolve, reject) => {
        for (let [key, value] of Object.entries(techObj)) {
            let query = `insert into tech_details (candidate_id, tech, tech_skill) values(${userId},"${key}","${value}");`;
            conn.query(query, (err, result) => {
                if (err) reject(err);
                console.log(result);
            })
        }
        resolve("success");
    })


}

const updateTechDetails = async (techObj, userId) => {
    return promise = new Promise((resolve, reject) => {
        for (let [key, value] of Object.entries(techObj)) {

            let query = `update tech_details set tech="${key}", tech_skill="${value}" where candidate_id=${userId};`;
            conn.query(query, (err, result) => {
                if (err) reject(err);
                console.log(result);
            });
        }
        resolve("succeess");
    })

}

const insertExpDetails = (expObj, userId) => {

    return promise = new Promise((resolve, reject) => {
        expObj.forEach((element) => {
            let query = `insert into expreience (candidate_id,company_name,design,worked_from,worked_till) values(${userId},"${element[0]}}","${element[1]}","${element[2]}","${element[3]}");`;
            conn.query(query, (err, result) => {
                if (err) reject(err);
                console.log("inserted successfully");
            });
        })
        resolve("success");
    });
}
const updateExpDetails = (expObj, userId) => {
    return promise = new Promise((resolve, reject) => {
        expObj.forEach((element) => {

            let query = `update expreience set company_name="${element[0]}", design="${element[1]}", worked_from="${element[2]}", worked_till="${element[3]}" where candidate_id=${userId};`;
            conn.query(query, (err, result) => {
                if (err) reject(err);
                console.log(result);
                console.log("updated successfully");
            });
        });
        resolve("success");
    });
}
const insertPrefDetails = (obj) => {
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
const updatePrefDetails = (obj) => {
    let userId = obj.userId;
    let location = obj.location;
    let c_ctc = obj.c_ctc;
    let e_ctc = obj.e_ctc;
    let n_period = obj.n_period;
    let design = 'jr developer';
    return promise = new Promise((resolve, reject) => {
        let query = `update preference set prefered_location="${location}", notice_period="${n_period}",department="${design}", current_ctc=${c_ctc} , expected_ctc=${e_ctc} where candidate_id=${userId};`;
        conn.query(query, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    })
}

const insertRefDetails = async (obj) => {
    let userId = obj.userId;
    let ename = obj.ename;
    let edesign = obj.edesign;
    let erelation = obj.erelation;
    return promise = new Promise((resolve, reject) => {
        let query = `insert into e_reference(candidate_id, e_name, e_design, e_relation) values(${userId},"${ename}","${edesign}","${erelation}");`;
        conn.query(query, (err, result) => {
            if (err) reject(err);
            resolve(result);

        });
    })
}
const updateRefDetails = async (obj) => {
    let userId = obj.userId;
    let ename = obj.ename;
    let edesign = obj.edesign;
    let erelation = obj.erelation;
    return promise = new Promise((resolve, reject) => {
        let query = `update e_reference set e_name="${ename}",e_design="${edesign}", e_relation="${erelation}" where candidate_id=${userId};`;
        conn.query(query, (err, result) => {
            if (err) reject(err);
            resolve(result);
            console.log("reference data updated successfully");
        });
    })
}
const updateCandidate = async (obj) => {
    let id = obj.id;
    let fname = obj.fname;
    let lname = obj.lname;
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
        let query = `update Candidate_Details set first_name="${fname}", last_name="${lname}", design="${design}", current_addreess="${add1}", permanent_address="${add2}", email="${email}", phone="${contact}", city="${city}" , state="${state}", gender="${gender}", zip_code="${zipcode}", relationship_status="${relation}" where candidate_id=${id};`;
        conn.query(query, (err, result) => {
            if (err) reject(err);
            resolve(result);

        })
    })

}
module.exports = {
    insertCandidateDetails, insertEducationDetails, updateEducationDetails, insertLanguageDetails,
    updateLanguageDetails, insertTechDetails, updateTechDetails, insertExpDetails, updateExpDetails,
    insertPrefDetails, updatePrefDetails, insertRefDetails, updateRefDetails, updateCandidate
};
