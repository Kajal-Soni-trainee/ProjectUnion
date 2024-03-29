const express = require("express");
const conn=require("./mysql.js");
const app =express()
app.set("view engine","ejs");
app.use(express.json());

var id;
app.get("/",(req,res)=>{
 if(req.query.sort==undefined){
    console.log("sort not defined");
    if(req.query.id==undefined){
        id=1;
     }
  else{
     id =parseInt(req.query.id);
  }
    let startIndex=(id-1)*250;
    let lastIndex=(req.query.id)*250;
    conn.query(`select * from student_master limit 250 offset ${startIndex}`,(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            let myobj={mydata:data,id:id};
            res.render('list',{obj:myobj});
            res.end();
        }
    });
 }
 if(req.query.sort!==undefined){
    if(req.query.sort=="asc"){
        console.log("ascending clicked!");
        if(req.query.id==undefined){
         id=1;
          }
       else{
          id =parseInt(req.query.id);
       }
        let startIndex=(id-1)*250;
        let lastIndex=(req.query.id)*250;
        conn.query(`select * from student_master order by student_city limit 250 offset ${startIndex} `,(err,data)=>{
            if(err){
                console.log(err);
            }
            else{
                let myobj={mydata:data,id:id};
                res.render('list',{obj:myobj});
                res.end();
            }
        });
    }
    else if(req.query.sort=="desc"){
         console.log("descing clicked!");
        if(req.query.id==undefined){
             id=1;
          }
       else{
          id =parseInt(req.query.id);
       }
        let startIndex=(id-1)*250;
        let lastIndex=(req.query.id)*250;
        conn.query(`select * from student_master  order by student_city desc limit 250 offset ${startIndex} `,(err,data)=>{
            if(err){
                console.log(err);
            }
            else{
                let myobj={mydata:data,id:id};
                res.render('list',{obj:myobj});
                res.end();
            }
        });
    }

 }
   

});
app.listen(8001);
