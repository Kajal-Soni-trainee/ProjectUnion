const mysql =require("mysql");
const conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Kajal@123",
    database:"practice_DBMS_db"
});

conn.query("select * from student_master",(err,result)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log(result);
    }
});
module.exports=conn;