const express= require("express");
const conn=require("./mysql2.js");
const app =express();
app.set("view engine", "ejs");
app.use(express.json());

app.get("/",(req,res)=>{
    var month;
    var id;
    var order;
    var field;
    if(req.query.order==undefined){
        order="asc";
    }
    else{
        order=req.query.order;
    }
    if(req.query.field==undefined){
        field="student_name";
    }
    else{
        field=req.query.field;
    }
    if(req.query.month==undefined){
        month="December";
    }
    else{
     month=req.query.month;
    } 
     
    
      if(req.query.id==undefined){
        id=1;
      }
      else{
        id=req.query.id;
      }
      
      let startIndex= (parseInt(id)-1)*20;
     let query = `select a.student_id , a.student_name,b.totalDays, ROUND((b.totalDays/31)*100,2) as percent from Student as a inner join 
     (select student_id, count(attendence) as totalDays from Attendece group by month,student_id,attendence having month="${month}" and attendence=1) as b on a.student_id=b.student_id order by ${field} ${order} limit 20 offset ${startIndex};`;
     conn.query(query,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            let myobj ={mydata:result, id:id,msg:`displaying data of month ${month}`, month:month, order:order, field:field};
            res.render('index',{obj:myobj});
            res.end();
        }
     });
});
app.listen(4000);