const mysql =require("mysql");
const conn = mysql.createConnection({
host:"localhost",
user:"root",
password:"Kajal@123",
database:"Student_Management_System"
});

if(conn){
    console.log("successfully connected !");
}
else{
    console.log("error");
}
module.exports=conn;