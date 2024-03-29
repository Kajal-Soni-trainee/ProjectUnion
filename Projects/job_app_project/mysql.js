const mysql=require("mysql");
const conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Kajal@123",
    database:"job_application_db"
});

if(conn){
    console.log("successfully connected");
}

module.exports=conn;