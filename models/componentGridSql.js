const sql_function = function (query, conn) {
    return promise = new Promise((resolve, reject) => {
        conn.query(query, (err, result) => {
            if (err) reject(err);

            resolve(result);

        });
    });

}

const sql_Orderby = function (query, element, order, conn) {
    return promise = new Promise((resolve, reject) => {
        conn.query(`${query} order by ${element} ${order};`, (err, result) => {
            if (err) reject(err);

            resolve(result);

        });
    });

}
const sql_limit = function (query, id, max, element, order, conn) {
    let startIdx = (parseInt(id) - 1) * max;
    let newQuery = `${query} order by ${element} ${order} limit ${max} offset ${startIdx};`;
    return promise = new Promise((resolve, reject) => {
        conn.query(newQuery, (err, result) => {
            if (err) reject(err);

            resolve(result);

        });
    });
}

const sql_filters = function (query, conn, element, order, obj) {
    console.log(obj);
    let keys = [];
    let values = [];
    for (const [key, value] of Object.entries(obj[0])) {
        if (value != "") {
            keys.push(key);
            values.push(value);
        }
    }
    console.log(keys);
    console.log(values);
    let txt = "";
    for (let i = 0; i < keys.length - 4; i++) {
        if (i < keys.length - 5) {
            if (typeof values[i] !== "number") {
                txt += `${keys[i]}="${values[i]}" ${values[values.length - 4]} `;
            }
            else {
                txt += `${keys[i]}= ${values[i]} ${values[values.length - 4]} `;
            }

        }
        else {
            if (typeof values[i] !== "number") {
                txt += `${keys[i]}="${values[i]}"`;
            }
            else {
                txt += `${keys[i]}=${values[i]}`;
            }

        }
    }
    let newQuery = `${query} where ${txt}`;
    console.log(newQuery);
    return promise = new Promise((resolve, reject) => {
        conn.query(`${newQuery} order by ${element} ${order};`, (err, result) => {
            if (err) reject(err);
            resolve(result);

        });
    });
}

const sql_filter_limit = function (query, id, limit, element, order, conn, obj) {
    let startIdx = (parseInt(id) - 1) * limit;
    console.log(obj);
    let keys = [];
    let values = [];
    for (const [key, value] of Object.entries(obj[0])) {
        if (value != "") {
            keys.push(key);
            values.push(value);
        }
    }
    console.log(keys);
    console.log(values);
    let txt = "";
    for (let i = 0; i < keys.length - 4; i++) {
        if (i < keys.length - 5) {
            if (typeof values[i] !== "number") {
                txt += `${keys[i]}="${values[i]}" ${values[values.length - 4]} `;
            }
            else {
                txt += `${keys[i]}= ${values[i]} ${values[values.length - 4]} `;
            }

        }
        else {
            if (typeof values[i] !== "number") {
                txt += `${keys[i]}="${values[i]}"`;
            }
            else {
                txt += `${keys[i]}=${values[i]}`;
            }

        }
    }
    let newQuery = `${query} where ${txt}`;
    console.log(newQuery);
    return promise = new Promise((resolve, reject) => {
        conn.query(`${newQuery} order by ${element} ${order} limit ${limit} offset ${startIdx};`, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

const sql_id = function (query, id, value, conn) {
    return promise = new Promise((resolve, reject) => {
        conn.query(`${query} where ${id}="${value}";`, (err, result) => {
            if (err) reject(err);

            resolve(result);

        });
    });
}

module.exports = {sql_filters,sql_limit,sql_Orderby, sql_filters, sql_filter_limit, sql_id};
