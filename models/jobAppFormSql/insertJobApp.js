const { selectQuery } = require("../studentReportSql");
const conn = require('../../mysql');
const { insertTechDetails } = require("../dynamicJobAppSql");
const insertEduDetail = async (eduObj) => {
    eduObj.forEach((element) => {
        return promise = new Promise((resolve, reject) => {
            let query2 = `insert into edu_master (candidate_id, course_type, passing_year, percent,course_name,school_name) values(${user_id},"${element[0]}","${element[1]}",${element[2]},"${element[3]}","${element[4]}")`;
            conn.query(query2, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    });
}

const insertLangDetail = async (lang, lhskill, leskill, lgskill) => {

    if (lang != undefined) {
        if (typeof lang != 'string') {
            for (let i = 0; i < lang.length; i++) {
                if (lang[i] == "hindi") {
                    if (typeof lhskill != 'string') {
                        lhskill.forEach(element => {
                            return promise = new Promise((resolve, reject) => {
                                let query11 = `insert into language_details (candidate_id, language, lang_skill) values (${user_id},"${lang[i]}","${element}");`;
                                conn.query(query11, (err, result) => {
                                    if (err) reject(err)
                                })
                            });
                        });

                    }
                    else {
                        return promise = new Promise((resolve, reject) => {
                            let query11 = `insert into language_details (candidate_id, language, lang_skill) values (${user_id},"${lang[i]}","${lhskill}");`;
                            conn.query(query11, (err, result) => {
                                if (err) reject(err);
                            });
                        })

                    }
                }
                else if (lang[i] == "english") {
                    if (typeof leskill != 'string') {
                        leskill.forEach(element => {
                            return promise = new Promise((resovle, reject) => {
                                let query11 = `insert into language_details (candidate_id, language, lang_skill) values (${user_id},"${lang[i]}","${element}");`;
                                conn.query(query11, (err, result) => {
                                    if (err) reject(err);
                                });
                            })

                        });
                    }
                    else {
                        return promise = new Promise((resolve, reject) => {
                            let query11 = `insert into language_details (candidate_id, language, lang_skill) values (${user_id},"${lang[i]}","${leskill}");`;
                            conn.query(query11, (err, result) => {
                                if (err) reject(err);
                            });
                        })

                    }
                }
                else {
                    if (typeof lgskill != 'string') {
                        lgskill.forEach(element => {
                            return promise = new Promise((resolve, reject) => {
                                let query11 = `insert into language_details (candidate_id, language, lang_skill) values (${user_id},"${lang[i]}","${element}");`;
                                conn.query(query11, (err, result) => {
                                    if (err) reject(err);
                                });
                            })

                        });
                    }
                    else {
                        return result = new Promise((resolve, reject) => {
                            let query11 = `insert into language_details (candidate_id, language, lang_skill) values (${user_id},"${lang[i]}","${lgskill}");`;
                            conn.query(query11, (err, result) => {
                                if (err) reject(err);
                            });
                        })

                    }
                }
            }
        }
        else {
            if (lang == "hindi") {
                if (typeof lhskill != 'string') {
                    lhskill.forEach(element => {
                        return promise = new Promise((resolve, reject) => {
                            let query11 = `insert into language_details (candidate_id, language, lang_skill) values (${user_id},"${lang}","${element}");`;
                            conn.query(query11, (err, result) => {
                                if (err) reject(err);
                            });
                        })
                    });
                }
                else {
                    return promise = new Promise((resolve, reject) => {
                        let query11 = `insert into language_details (candidate_id, language, lang_skill) values (${user_id},"${lang}","${lhskill}");`;
                        conn.query(query11, (err, result) => {
                            if (err) reject(err);
                        });
                    })

                }
            }
            else if (lang == "english") {
                if (typeof leskill != 'string') {
                    leskill.forEach(element => {
                        return promise = new Promise((resolve, reject) => {
                            let query11 = `insert into language_details (candidate_id, language, lang_skill) values (${user_id},"${lang}","${element}");`;
                            conn.query(query11, (err, result) => {
                                if (err) reject(err);
                            });
                        })

                    });
                }
                else {
                    return promise = new Promise((resolve, reject) => {
                        let query11 = `insert into language_details (candidate_id, language, lang_skill) values (${user_id},"${lang}","${leskill}");`;
                        conn.query(query11, (err, result) => {
                            if (err) reject(err);
                        });
                    })

                }
            }
            else {
                if (typeof lgskill != 'string') {
                    lgskill.forEach(element => {
                        return promise = new Promise((resolve, reject) => {
                            let query11 = `insert into language_details (candidate_id, language, lang_skill) values (${user_id},"${lang}","${element}");`;
                            conn.query(query11, (err, result) => {
                                if (err) reject(err);
                            });
                        })
                    });
                }
                else {
                    return promise = new Promise((resolve, reject) => {

                        let query11 = `insert into language_details (candidate_id, language, lang_skill) values (${user_id},"${lang}","${lgskill}");`;
                        conn.query(query11, (err, result) => {
                            if (err) reject(err);
                        });
                    })

                }
            }
        }
    }
}

const insertTechDetail = async (tech, tpskill, tjskill, toskill) => {
    if (tech != undefined) {
        if (typeof tech != 'string') {
            for (let i = 0; i < tech.length; i++) {
                if (tech[i] == "php") {
                    return promise = new Promise((resolve, reject) => {
                        let query12 = `insert into tech_details (candidate_id, tech, tech_skill) values(${user_id},"${tech[i]}","${tpskill}");`;
                        conn.query(query12, (err, result) => {
                            if (err) reject(err);
                        });
                    })

                }
                else if (tech[i] == "Java") {
                    return promise = new Promise((resolve, reject) => {
                        let query12 = `insert into tech_details (candidate_id, tech, tech_skill) values(${user_id},"${tech[i]}","${tjskill}");`;
                        conn.query(query12, (err, result) => {
                            if (err) reject(err);
                        });
                    })

                }
                else {
                    return promise = new Promise((resolve, reject) => {
                        let query12 = `insert into tech_details (candidate_id, tech, tech_skill) values(${user_id},"${tech[i]}","${toskill}");`;
                        conn.query(query12, (err, result) => {
                            if (err) reject(err);
                        });
                    })

                }
            }
        }
        else {
            if (tech == "php") {
                return promise = new Promise((resolve, reject) => {
                    let query12 = `insert into tech_details (candidate_id, tech, tech_skill) values(${user_id},"${tech}","${tpskill}");`;
                    conn.query(query12, (err, result) => {
                        if (err) reject(err);
                    });
                })

            }
            else if (tech == "Java") {
                return promise = new Promise((resolve, reject) => {
                    let query12 = `insert into tech_details (candidate_id, tech, tech_skill) values(${user_id},"${tech}","${tjskill}");`;
                    conn.query(query12, (err, result) => {
                        if (err) reject(err);
                    });
                })

            }
            else {
                return promise = new Promise((resolve, reject) => {
                    let query12 = `insert into tech_details (candidate_id, tech, tech_skill) values(${user_id},"${tech}","${toskill}");`;
                    conn.query(query12, (err, result) => {
                        if (err) reject(err);
                    });
                })

            }
        }
    }
}
module.exports = { insertEduDetail, insertLangDetail, insertTechDetail };