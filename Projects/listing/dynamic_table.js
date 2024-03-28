const mysql = require("mysql");
const express = require("express");
//const { parse, stringify } = require('html-parse-string');
//const functions = require("./d_table_func.js");
const app =express();
app.use(express.urlencoded({extended: true})); 
const conn= require("./mysql2.js");
app.set("view engine","ejs");
app.use(express.json());


/**const sql_function = async function(query){
    conn.query(query,(err,result)=>{
        if(err){
          return err;
        }
        else{
          let data=result;
         
        }
    });
}
/**(const create_table = function(result){
    let total_rows=result.length;
    let total_column=result[0].length;
     var table = document.createElement("table");
    result.forEach((item)=>{
    var tr=document.createElement("tr");
    let values=Object.values(item);
     values.forEach((data)=>{
       var td=document.createElement("td");
       td.innerHTML=data;
       tr.appendChild(td);
     });
     table.appendChild(tr);
    });
   
    return table;
}*/

var sql_func = async function(query, conn){
    conn.query(query,(err,result)=>{
        if(err){
            return err;
        }
        else{
            console.log(result);
           return result;
        }
    });
}


var fieldOption = function(result){

   console.log(result);
   var keys=Object.keys(result[0]);


   var element = 
   '<label for="fields">Select field</label>'+
   '<select name="field" id="field">';

   keys.forEach((item)=>{
    element+=`<option id="${item}" value="${item}">${item}<option>`;
   });

   element+='</select>';
  
   return element
}
app.get("/",(req,res)=>{
    res.render("d_table.ejs");
    res.end();
});
app.post("/",(req,res)=>{
    console.log(req.body);
    
    var query=`${req.body.query}`;
conn.query(query,(err,result)=>{
    if(err){
        console.log(err);
        res.render('Error',{query:query, err:err});
    }
    else{
      /**  res.render("tables",{data:result});
        res.end();*/
        let len = result.length;
        let rpp=10;
        var pages;
        console.log(len);
        if(len>10){
          pages=Math.ceil((len/10));
          query=`${query} limit 10;`;
          conn.query(query,(err,result)=>{
               if(err){
                console.log(err);
               }
               else{
             let selectElement =fieldOption(result); 
             console.log(selectElement);
                res.render("tables",{data:result,pages:pages, limit:10, pagination:true, query:query, id:1, field:selectElement});
                res.end();  
            }
          });
        }
        else{
            conn.query(query,(err,result)=>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log(result);
                    res.render("tables",{data:result, pagination:false,id:1,query:query,limit:len,pages:0});
                    res.end();
                }
            })

        }
    }
})  
});

app.get('/tables',(req,res)=>{
    var id=parseInt(req.query.id);
    var limit=parseInt(req.query.limit);
    var query=req.query.query;
    var startIdx=(id-1)*limit;
    var pages=parseInt(req.query.pages);
    conn.query(`${query} limit ${limit} offset ${startIdx};` ,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render("tables",{data:result,pages:pages, limit:10, pagination:true, query:query, id:id});
            res.end();  
        }
    });
})
app.listen(8001);
