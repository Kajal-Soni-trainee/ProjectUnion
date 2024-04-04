const conn = require('../mysql');


const selectQuery = async (query) => {
    return promise = new Promise((resolve, reject) => {
        conn.query(query, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    });
}


module.exports = { selectQuery };