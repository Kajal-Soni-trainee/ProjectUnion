const express = require("express");
const app = express();
const md5 = require('md5');
const conn = require("./mysql.js");
const path = require('path');
const fs = require('fs');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended :true}));
app.use(bodyParser.json());
require('dotenv').config();
const jwt=require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const session = require("express-session");
app.use(session({resave:false, saveUninitialized:true, secret:"your secret key"}));
app.use(cookieParser());
const SECRET_KEY="Kajal123";
const functions =require("./Projects/component_grid/middleware.js");
//const functions_df= require('./Projects/dynamic_form_creation/middleware.js');
const {PORT} = process.env;
console.log(PORT);
app.set("view engine", "ejs");
let filename = path.join(__dirname, 'views/dynamic_job_form_views');

//login system router
app.get('/login_system',(req,res)=>{
    res.render('login_system_views/index',{errMsg:"",id:0,otp:0,isReg:false});
    res.end();

});
app.post('/action', (req, res) => {
    console.log("here its server");
    console.log(req.body);
    let u_name=req.body.uname;
    let u_email=req.body.uemail;
    let u_contact = req.body.ucontact;
    let u_salt = Math.floor(Math.random() * 9000 + 1000);
    let otp= Math.floor(Math.random() * 900000000000 + 100000000000);
    let query1= `select * from users where u_name="${u_name}" and u_email="${u_email}";`;
    conn.query(query1,(err,result)=>{
        if(result.length==0){
          let query =`insert into users (u_name, u_email, u_contact, u_salt, u_otp) values ("${u_name}", "${u_email}", "${u_contact}",${u_salt},${otp});`;
          conn.query(query,(err,result)=>{
             if(err) throw err;
             console.log("success fully inserted");
             let id=result.insertId;
             console.log(id,otp);
               res.render('login_system_views/index', {errMsg:"",id:id,otp:otp,isReg:true});
               res.end();
          });
        }
        else{
          res.render('login_system_views/index', {errMsg:"User Already registered",id:0,otp:otp,isReg:false});
          res.end();
        }
    });
   
 });
 app.get('/pass',(req,res)=>{
    let id=req.query.id;
    let otp=req.query.otp;
    res.render('login_system_views/password',{id:id,otp:otp,isSuccess:false,errMsg:""});
    res.end();
 });
 app.post('/pass',(req,res)=>{
    console.log(req.body);
    console.log(req.body)
    let id= req.body.id;
    let pass = req.body.upass;
    let u_otp=req.body.otp;
   console.log(u_otp);
    let query1=`select * from  users where user_id=${id};`;
    conn.query(query1,(err,result)=>{
       if(err) throw err;
        if(result.length==0){
          res.render('login_system_views/password',{id:0,otp:u_otp,isSuccess:false,errMsg:"user does not exist please register first"});
          res.end();
        }
        else{
          let query = `select u_salt from users where user_id=${id};`;
          conn.query(query,(err,result)=>{
               if(err) throw err;
               let password=md5(result[0].u_salt+pass);
               let query2=`update users set u_pass="${password}" where user_id=${id} and u_otp=${u_otp};`;
               conn.query(query2,(err,result)=>{
                if(err) throw err;
                console.log("update successfully");
                res.render('login_system_views/password',{id:0,otp:u_otp,isSuccess:true,errMsg:""});
                res.end();
               });
       });
        }
    })
 });
 
 app.get('/login',(req,res)=>{
 res.render('login_system_views/login',{email:"",errMsg:"",successMsg:""});
 res.end();
 });
 app.post('/login',(req,res)=>{
    let email=req.body.email;
    let pass=req.body.pass;
    let query=`select * from users where u_email="${email}";`;
    conn.query(query,(err,result)=>{
          if(err) throw err;
          if(!result|| result.length==0){
             let errMsg='invalid username or password';
             res.render('login_system_views/login',{email:email,errMsg:errMsg,successMsg:""});
             res.end();
          }
          else{
             let dbpass=result[0].u_pass;
             let salt=result[0].u_salt;
             let u_email=result[0].u_email;
             let u_name=result[0].u_name;
             let newPass = md5(salt+pass);
             if(dbpass!=newPass){
                let errMsg='invalid username or password';
                res.render('login_system_views/login',{email:email,errMsg:errMsg,successMsg:""});
                res.end();
             }
             else{
                let successMsg="Logged in Successfully";
                const token = jwt.sign({email:u_email},SECRET_KEY);
                res.cookie('token',token,{
                    maxAge:1000*60*60*2,
                   httpOnly:true,
                });
                res.render('login_system_views/home',{u_name:u_name});
                res.end();
             }
          }
    });
 });
 app.get("/checkdb",(req,res)=>{
    let id=req.query.id;
    let query =`select * from users where user_id=${id};`;
     conn.query(query,(err,result)=>{
       console.log(result);
       if(result[0].u_pass==null){
          let query2=`delete from users where user_id=${id};`;
          conn.query(query2,(err,result1)=>{
             console.log(result1);
          })
       }
     })
 });
 app.get('/forget_Pass',(req,res)=>{
       let email = req.query.email;
       if(email==""){
          let errMsg="please try first";
          res.render('login_system_views/login',{email:"",errMsg:errMsg,successMsg:""});
          res.end();
       }
       else{
          let query=`select * from users where u_email="${email}";`;
          conn.query(query,(err,result)=>{
           if(err) throw err;
           console.log(result);
           if(result.length!=0){
             let id = result[0].user_id;
             let otp=result[0].u_otp;
             if(result[0].u_pass!=null){
                res.render('login_system_views/password',{id:id,otp:otp,isSuccess:false,errMsg:""});
                res.end();
             }
           }
           else{
             let errMsg="Invalid credentials";
             res.render('login_system_views/login',{email:"",errMsg:errMsg,successMsg:""});
             res.end();
           }
          });
       }
 });
 app.get('/list',(req,res)=>{
    let token = req.headers.cookie.split("=")[1];
    if(token){
       console.log(token);
       let query=`select * from users;`;
       conn.query(query,(err,result)=>{
         if(err) throw err;
         res.render('login_system_views/list',{result:result});
         res.end();
   });
    }
  else{
    let errMsg="You need to login first";
    res.render('login_system_views/login',{email:"",errMsg:errMsg,successMsg:""});
    res.end();
  }
 });

 app.get('/home',(req,res)=>{
   res.render('home');
   res.end();
 });

 app.get('/logout',(req,res)=>{
    res.clearCookie("token");
    res.render('login_system_views/login',{email:"",errMsg:"",successMsg:""});
    res.end();
 });


// tic tac toe router
app.get('/tic_tac_toe',(req,res)=>{
   res.render('assignment3_tic-tac-toe');
   res.end();
});

//kuku cube

app.get('/kuku_cube',(req,res)=>{
   res.render('assign2_game');
   res.end();
});

 // async await router

 app.get('/json_placeholder', (req,res)=>{
   res.render('async_await_prac_views/index');
   res.end();
});
app.get('/comments',(req,res)=>{
   let id = req.query.id;
   res.render('async_await_prac_views/comments',{id:id});
});

// simple crud
var checkSession = function(req,res,next){
   if(req.session.user){
       next();
   }
   else{
      // res.send("user is not logged in");
       res.redirect('simple_crud/login');
       res.end();
   }
}
app.get("/simple_crud",(req,res)=>{
   res.render('simple_crud/index',{error:"",dataObj:"",isError:false});
   res.end();
});

app.post("/simple_crud",(req,res)=>{
const fname=req.body.fname;
const lname=req.body.lname;
const age =req.body.age;
const pass =req.body.pass;
const con=req.body.con;
const gen=req.body.gen;
const hobby=req.body.hobbies;
const email=req.body.email;
const add=req.body.add;

const dataObj=new Object();
dataObj.fname=fname;
dataObj.lname=lname;
dataObj.age=age;
dataObj.pass=pass;
dataObj.con=con;
dataObj.gen=gen;
dataObj.hobby=hobby;
dataObj.email=email;
dataObj.add=add;

const errElement= new Object();
let errFlag=0;
if(fname==""){
   errElement.fname="please enter your first name";
   errFlag++;
}
else if (fname.length > 15){
   errElement.fname="your first name is exceeding the maximum length";
}
else{
   errElement.fname="";
}
if(lname==""){
   errElement.lname="please enter your last name";
   errFlag++;
}
else if(lname.length>15){
   errElement.fname="your last name is exceeding the maximum length";
}
else{
   errElement.lname="";
}
if(age==""){
   errElement.age="please enter your age";
   errFlag++;
}

else if(!/^[0-9]{2}$/.test(age)){
   errElement.age="your age should be number";
}
else if(age<15 && age>25){
   errElement.age="your age should be greater than 15 and less than 25";
}
else{
   errElement.age="";
}
if(pass==""){
   errElement.pass="please enter your password";
   errFlag++;
}
else{
   errElement.pass="";
}
if(con==""){
   errElement.con="please enter your contact";
   errFlag++;
}
else if(!/^[0-9]{10}$/.test(con)){
   errElement.con="your phone number should contain only 10 digits"
}
else{
   errElement.con="";
}
if(gen==undefined){
   errElement.gen="please enter your gender";
   errFlag++;
}
else{
   errElement.gen="";
}
if(hobby==undefined){
   errElement.hobby="please enter your hobby";
   errFlag++;
}
else{
   errElement.hobby="";
}
if(email==""){
   errElement.email="please enter your email";
   errFlag++;
}
else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
   errElement.email="please enter a valid email";
}
else{
   errElement.email="";
}
if(add==""){
   errElement.add="please enter your add";
   errFlag++;
}
else{
   errElement.add="";
}
console.log(dataObj);
if(errFlag>0){
   res.render('simple_crud/index',{errElement:errElement,dataObj:dataObj,isError:true});
}

//let query="INSERT INTO `project1`.`student_detail` (`student_id`, `fname`, `lname`, `age`, `pass`, `contact`, `gender`, `hobby`, `email`, `address`) VALUES ('${}', 'soni', '21', 'kajal@123', '23545', 'female', 'singing', 'kajal@gmail.com', 'eteryt')";
else{
let query=`insert into student_detail(fname,lname,age , pass, contact, gender,hobby,email,address) values ("${fname}",
   "${lname}",${parseInt(age)},"${pass}","${con}","${gen}","${hobby}","${email}","${add}")`;
   conn.query(query,(err,result)=>{
       if(err){
           console.log(err);
       }
       else{
        console.log(result);
       }
   })
   res.render('simple_crud/index',{error:"",dataObj:"",isError:false});
res.end();
}
})

app.get('/simple_crud_list',(req,res)=>{
   conn.query("select * from student_detail",(err,result)=>{
       if(err){
           console.log(err);
       }
       else{
      
      res.render('simple_crud/list',{obj:result});
      res.end();
       }
   });
})

app.get('/simple_crud_details',checkSession,(req,res)=>{
  console.log(req.session.user);
   let id=req.query.id;
   console.log(id);
   conn.query(`select * from student_detail where student_id="${id}" `,(err,result)=>{
       if(err){
           console.log(err);
       }
       else{
      console.log(result);
      res.render('simple_crud/details',{obj:result});
      res.end();
       }
   })
})

app.get("/simple_crud_login",(req,res)=>{
   res.render('simple_crud/login');
   res.end();
});

app.post("/simple_crud_index",(req,res)=>{
   let email = req.body.email;
   let pass=  req.body.pass;
   let query=`select * from student_detail where email="${email}" and pass="${pass}"`;
   conn.query(query,(err,data)=>{
      
     if(err){
         console.log(err);
     }
     else if(data.length==1){
       console.log(data);
       console.log(data[0].student_id + "id :"+data[0].pass+ "pass");
       const newUser={id:data[0].student_id,pass:data[0].pass};
           req.session.user=newUser;
           console.log(req.session.user);
           req.session.save();
         res.render('simple_crud/index',{error:"",dataObj:"",isError:false});
         res.end();
     }
     else{
         res.send("user is not registered");
         res.end();
     }
});
});
app.get("/simple_crud_update",checkSession,(req,res)=>{
   let id = req.query.id;
   console.log(req.session.user+"logged in");
   if(req.session.user.id==id){
      
   let query= `select * from student_detail where student_id=${id}`;
   conn.query(query,(err,data)=>{
       if(err){
           console.log(err);
       }
       else{
           res.render('simple_crud/update',{obj:data});
       }
   }) ;
   }
   else{
       res.send("you cannot update the data of other user");
   }
})
app.post("/simple_crud_update",(req,res)=>{
   let id = req.body.id;
   
   let query=`update student_detail set fname="${req.body.fname}", lname="${req.body.lname}",age="${req.body.age}",pass="${req.body.pass}", contact="${req.body.con}",gender="${req.body.gen}",hobby="${req.body.hobbies}", email="${req.body.email}", address="${req.body.add}" where student_id=${id}`;
   conn.query(query,req.body,(err,result)=>{
       if(err){
           console.log(err);
       }
       else{
           //console.log(result);
           conn.query(`select * from student_detail where student_id="${id}" `,(err,result)=>{
               if(err){
                   console.log(err);
               }
               else{
              //console.log(result);
              res.render('simple_crud/details',{obj:result});
              res.end();
               }
           })
       }
   })
});
app.get("/simple_crud_delete",checkSession,(req,res)=>{
   let id = req.query.id;
   console.log(req.session.user[id]+"loggedin");
  if(req.session.user.id==id){
   conn.query(`delete from student_detail where student_id=${id};`,(err,res)=>{
       if(err){
           console.log(err);
       }
     });
  }
  else{
   res.send("you cannot delete data of other user");
  }  
});


// dynamic component grid

var isPagination=false;
var isFilter=false;
var idSelected=false;
app.get("/grid",(req,res)=>{
   
    res.render("component_grid_view/index",{isPagi:false, showData:false,result:"",pagination:"pagination",tables:"tables",id:1, limit:0,pages:0,query:"",order:"",element:"",filter:false,obj:""});
    res.end();
    
});

app.post("/grid",(req,res)=>{
    if(!isFilter){
        isFilter=true;
    console.log(req.method);
    console.log(req.body);
 var query = req.body.query;
  let myquery=query;
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
            res.render("component_grid_view/index",{isPagi:false, showData:true,result:result,pagination:"pagination",tables:"tables",id:1, limit:0,pages:0,query:query,order:order,element:element,filter:false,obj:""});
            res.end();
        }).catch((err)=>{
            console.log(err);
        });
      
    }
     else{
         isPagination=true;
        let pages=Math.ceil(len/max);
        functions.sql_limit(query,1,max,element,order,conn).then((result)=>{
            res.render("component_grid_view/index",{isPagi:true, showData:true,result:result,pagination:"pagination",tables:"tables", id:1, limit:max,pages:pages,query:query,order:order,element:element,filter:false,obj:""});
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
         res.render("component_grid_view/index",{isPagi:false, showData:true,result:result,pagination:"pagination",tables:"tables",id:1, limit:0,pages:0,query:query,order:order,element:element,filter:true,obj:obj});
         res.end();
        }
        else{
            pages=Math.ceil(len/limit);
            functions.sql_filter_limit(query,1,limit,element,order,conn,obj).then((result)=>{
                console.log(obj);
                res.render("component_grid_view/index",{isPagi:true, showData:true,result:result,pagination:"pagination",tables:"tables", id:1, limit:limit,pages:pages,query:query,order:order,element:element,filter:true,obj:obj});
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
        res.render("component_grid_view/index",{isPagi:true, showData:true,result:result,pagination:"pagination",tables:"tables", id:id, limit:limit,pages:pages,query:query,order:order,element:element,filter:false,obj:""});
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
    res.render("component_grid_view/index",{isPagi:false, showData:true,result:result,pagination:"pagination",tables:"tables",id:1, limit:0,pages:0,query:query,order:"asc",element:id,filter:true,obj:""});
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
        res.render("component_grid_view/index",{isPagi:true, showData:true,result:result,pagination:"pagination",tables:"tables", id:id, limit:limit,pages:pages,query:query,order:order,element:element,filter:true,obj:obj});
        res.end();
    }).catch((err)=>{
        console.log(err);
    });
});



app.listen(8080);