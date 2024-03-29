const mysql =require("mysql");
const conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Kajal@123",
    database:"Student_Management_System"
});


module.exports=conn;