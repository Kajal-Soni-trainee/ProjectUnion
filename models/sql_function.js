const conn = require('../mysql.js');

const insertUser = async (obj)=>{
    let u_name = obj.uname;
    let u_email = obj.uemail;
    let u_contact = obj.ucontact;
    let u_salt = Math.floor(Math.random() * 9000 + 1000);
    let otp = Math.floor(Math.random() * 900000000000 + 100000000000);
    let promise = new Promise((resolve,reject)=>{
        let query1 = `select * from users where u_name="${u_name}" and u_email="${u_email}";`;
        conn.query(query1, (err, result) => {
            if(err) reject(err);
           if (result.length == 0) {
              let query = `insert into users (u_name, u_email, u_contact, u_salt, u_otp) values ("${u_name}", "${u_email}", "${u_contact}",${u_salt},${otp});`;
              conn.query(query, (err, result) => {
                 if (err) throw err;
                 console.log("success fully inserted");
                 let id = result.insertId;
                 console.log(id, otp);
                 res.render('login_system_views/index', { errMsg: "", id: id, otp: otp, isReg: true });
                 res.end();
              });
           }
           else {
              res.render('login_system_views/index', { errMsg: "User Already registered", id: 0, otp: otp, isReg: false });
              res.end();
           }
        });
    });
   
}

const updatePassword =async (password, id, u_otp)=>{
      return promise = new Promise((resolve,reject)=>{
        let query = `update users set u_pass="${password}" where user_id=${id} and u_otp=${u_otp};`;
        conn.query(query, (err,result)=>{
            if(err) reject(err);
            resolve(result);
        })
      });
}
const findById = async (table_name,field_name, value)=>{
    return promise = new Promise((resolve, reject)=>{
        let query = `select * from ${table_name} where ${field_name}=${value};`;
        conn.query(query,(err,result)=>{
          if(err) reject (err);
          resolve(result);
        })
    });
}

const findByValue = async (table_name, field_name, value)=>{
    return promise = new Promise((resolve,reject)=>{
        let query = `select * from ${table_name} where ${field_name}="${value}";`;
        conn.query(query,(err,result)=>{
          if(err) reject (err);
          resolve(result);
        })
    })
}
const deleteById = async (table_name, field_name, id)=>{
    return promise = new Promise((resolve,reject)=>{
          let query =`delete from ${table_name} where ${field_name}=${id};`;
          conn.query(query,(err,result)=>{
            if(err) reject(err);
            resolve(result);
          })
    })
}

const findAll = async (table_name)=>{
    return promise = new Promise((resolve, reject)=>{
        let query = `select * from ${table_name};`;
        conn.query(query,(err,result)=>{
            if(err) reject (err);
            resolve(result);
        })
    })
}
module.exports={insertUser, findById, updatePassword, findByValue, deleteById, findAll};