const updateEduDetail = async (eduObj) => {
    eduObj.forEach((element) => {
        return promise = new Promise((resolve, reject) => {
            let query2 = `update edu_master set course_name="${element[3]}", school_name="${element[4]}",passing_year="${element[1]}", percent=${element[2]} where candidate_id=${id} and course_type="${element[0]}";`;

            conn.query(query2, (err, result) => {
                if (err) reject(err);
                console.log("successfully update education details");
            });
        });
    });
    resolve("updated");
}

const updateLangDetail = async (langObj) => {
    if (langObj.length != 0) {
        let keys = Object.keys(langObj);
        keys.forEach((element) => {
            if (element == "hindi") {
                if (typeof langObj.hindi == 'string') {
                    return promise = new Promise((resolve, reject) => {
                        let query3 = `update language_details set language="${element}", lang_skill="${langObj.hidi}" where candidate_id=${id};`;
                        conn.query(query3, (err, result) => {
                            if (err) reject(err);
                            console.log("successfully added lang");
                        });
                    })

                }
                else {
                    langObj.hindi.forEach((item) => {
                        return promise = new Promise((resolve, reject) => {
                            let query3 = `update language_details set language="${element}", lang_skill="${item}" where candidate_id=${id};`;
                            conn.query(query3, (err, result) => {
                                if (err) reject(err);
                                console.log("successfully added lang");
                            });
                        });
                    })

                }
            }
            if (element == "english") {
                if (typeof langObj.english == 'string') {
                    return promise = new Promise((resolve, reject) => {
                        let query3 = `update language_details set language="${element}", lang_skill="${langObj.english}" where candidate_id=${id};`;
                        conn.query(query3, (err, result) => {
                            if (err) reject(err);
                            console.log("successfully added lang");
                        });
                    })

                }
                else {
                    langObj.english.forEach((item) => {
                        return promise = new Promise((resolve, reject) => {
                            let query3 = `update language_details set language="${element}", lang_skill="${item}" where candidate_id=${id};`;
                            conn.query(query3, (err, result) => {
                                if (err) reject(err);
                                console.log("successfully added lang");
                            });
                        });
                    })

                }
            }

            if (element == "gujararti") {
                if (typeof langObj.gujarati == 'string') {
                    return promise = new Promise((resolve, reject) => {
                        let query3 = `update language_details set language="${element}", lang_skill="${langObj.gujarati}" where candidate_id=${id};`;
                        conn.query(query3, (err, result) => {
                            if (err) reject(err);
                            console.log("successfully added lang");
                        });
                    })

                }
                else {

                    langObj.gujarati.forEach((item) => {
                        return promise = new Promise((resolve, reject) => {
                            let query3 = `update language_details set language="${element}", lang_skill="${item}" where candidate_id=${id};`;
                            conn.query(query3, (err, result) => {
                                if (err) reject(err);
                                console.log("successfully added lang");
                            });
                        })

                    });
                }
            }
        });
        resolve("update langDetails");
    }
}

const updateTechDetail = async (techObj) => {
    if (techObj.length != 0) {
        for (const [key, value] of Object.entries(techObj)) {
            return promise = new Promise((resolve, reject) => {
                let query4 = `update tech_details set tech="${key}" , tech_skill="${value}" where candidate_id=${id};`;
                conn.query(query4, (err, result) => {
                    if (err) reject(err);
                    console.log("successfully added tech");
                });
            })
        }
        resolve("updated techObj Successfully");
    }
}
module.exports = { updateEduDetail, updateLangDetail, updateTechDetail };