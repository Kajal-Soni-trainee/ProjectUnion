const conn = require("./mysql.js");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const component = function (name, type) {
    return promise = new Promise((resolve, reject) => {
       let query=`select * from select_master as a inner join option_master as b on a.comp_name=b.comp_name where a.comp_name="${name}" and a.comp_type="${type}";`
       conn.query(query,(err,result)=>{
        if(type!="dropdown"){
 let element=`<div class="${name}">`;
          result.forEach(item => {
            element+=`<label for="${item.opt_id}">${item.opt_name}</label>`;
        element+=`<input type="${item.comp_type}" name="${item.name}" id="${item.opt_id}" value="${item.opt_value}"/>`;
          });
          element+=`</div>`;
          //console.log(element);
          resolve(element);
        }
        else{
        let element=`<div class="${name}"> <select name="${name}">`;
        result.forEach(item=>{
            element+=`<option id="${item.opt_id}" value="${item.opt_value}">${item.opt_name}</option>`;
        });
        element+=`</select></div>`;
        resolve(element);
        }
       });
    });
}

module.exports.component = component;