const express = require("express");
const conn =require("./mysql");
const functions =require("./middleware.js");
const app = express();
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
var isPagination=false;
var isFilter=false;
var idSelected=false;
app.get("/",(req,res)=>{
   
    res.render("index",{isPagi:false, showData:false,result:"",pagination:"pagination",tables:"tables",id:1, limit:0,pages:0,query:"",order:"",element:"",filter:false,obj:""});
    res.end();
    
});

app.post("/",(req,res)=>{
    if(!isFilter){
        isFilter=true;
    console.log(req.method);
    console.log(req.body);
 var query = req.body.query;
   myquery=query;
   let sql_result;
 console.log(query);
 
 functions.sql_function(query,conn).then((result)=>{
     //res.render("index");
      let len = result.length;
      let keys = Object.keys(result[0]);
      let element=keys[0];
      let order="asc";
      //console.log(element);
      let max=20;
    if(len<max){
        functions.sql_Orderby(query,element,order,conn).then((result)=>{
            res.render("index",{isPagi:false, showData:true,result:result,pagination:"pagination",tables:"tables",id:1, limit:0,pages:0,query:query,order:order,element:element,filter:false,obj:""});
            res.end();
        }).catch((err)=>{
            console.log(err);
        });
      
    }
     else{
         isPagination=true;
        let pages=Math.ceil(len/max);
        functions.sql_limit(query,1,max,element,order,conn).then((result)=>{
            res.render("index",{isPagi:true, showData:true,result:result,pagination:"pagination",tables:"tables", id:1, limit:max,pages:pages,query:query,order:order,element:element,filter:false,obj:""});
            res.end();
        }).catch((err)=>{
            console.log(err);
        });
    
     }
 }).catch((err)=>{
    console.log(err);
 });
}
else{
      
        console.log(req.body);
       // let keys = Object.keys(req.body); 
        let query=req.body.query;
        let element=req.body.element;
        let order=req.body.order;
        //let values=Object.values(req.body);
       
      const obj=[];
      obj.push(req.body);
      console.log(obj);
       functions.sql_filters(query,conn,element,order,obj).then((result)=>{
       // console.log(result);
        let len =result.length;
    
       let limit = 20;
        if(len<limit){
            console.log(obj);
         res.render("index",{isPagi:false, showData:true,result:result,pagination:"pagination",tables:"tables",id:1, limit:0,pages:0,query:query,order:order,element:element,filter:true,obj:obj});
         res.end();
        }
        else{
            pages=Math.ceil(len/limit);
            functions.sql_filter_limit(query,1,limit,element,order,conn,obj).then((result)=>{
                console.log(obj);
                res.render("index",{isPagi:true, showData:true,result:result,pagination:"pagination",tables:"tables", id:1, limit:limit,pages:pages,query:query,order:order,element:element,filter:true,obj:obj});
                res.end();
            }).catch((err)=>{
                console.log(err);
            });
        }
        }).catch((err)=>{
            console.log(err);
        }); 
        isFilter=false;
        
    }

});


app.get('/data',(req,res)=>{
    let id=parseInt(req.query.id);
    let query=req.query.query;
    let limit=req.query.limit;
    let pages=req.query.pages;
    let order=req.query.order;
    let element=req.query.element;
    functions.sql_limit(query,id,limit, element,order,conn).then((result)=>{
        res.render("index",{isPagi:true, showData:true,result:result,pagination:"pagination",tables:"tables", id:id, limit:limit,pages:pages,query:query,order:order,element:element,filter:false,obj:""});
        res.end();
    }).catch((err)=>{
        console.log(err);
    });
});

app.post('/id',(req,res)=>{
 let query=req.body.query;
 let id = Object.keys(req.body)[0];
 let value=Object.values(req.body)[0];
 functions.sql_id(query,id,value,conn).then((result)=>{
    res.render("index",{isPagi:false, showData:true,result:result,pagination:"pagination",tables:"tables",id:1, limit:0,pages:0,query:query,order:"asc",element:id,filter:true,obj:""});
    res.end();
 }).catch((err)=>{
    console.log(err);
 });
});

app.get('/filter_data',(req,res)=>{
     let id= (req.query.id);
     let limit=req.query.limit;
     let query=req.query.query;
     let element=req.query.element;
     let order=req.query.order;
     let pages =req.query.pages;
     let obj=req.query.obj;
     let result=req.query.result;
    //  console.log(query);
    //  console.log(element);
    //  console.log(order);
   //console.log(obj);
   // console.log(query);
   
     functions.sql_filter_limit(query,1,limit,element,order,conn,obj).then((result)=>{
        res.render("index",{isPagi:true, showData:true,result:result,pagination:"pagination",tables:"tables", id:id, limit:limit,pages:pages,query:query,order:order,element:element,filter:true,obj:obj});
        res.end();
    }).catch((err)=>{
        console.log(err);
    });
});
app.listen(8080);