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


//job application from route

app.get('/job_app_form', (req, res) => {
   res.render('job_app_project_view/index', { dataObj: "", errorObj: "", isError: false, isUpdate:false,can:"",exp:"",edu:"",lang:"",tech:"",ref:"",pref:"" });
   res.end();
});

app.post('/job_app_form', (req, res) => {
   console.log("form is submitted");
   console.log(req.body);
   let fname = req.body.fname;
   let lname = req.body.lname;
   let design = req.body.design;
   let email = req.body.email;
   let add1 = req.body.add1;
   let add2 = req.body.add2;
   let state = req.body.state;
   let city = req.body.city;
   let gender = req.body.gender;
   let zipcode = req.body.zipcode;
   let phone = req.body.phone;
   let relation = req.body.relation;
   let ssc_boardname = req.body.ssc_boardname;
   let ssc_sname = req.body.ssc_sname;
   let ssc_pyear = req.body.ssc_pyear;
   let ssc_percent = req.body.ssc_percent;
   let hsc_boardname = req.body.hsc_boardname;
   let hsc_sname = req.body.hsc_sname;
   let hsc_pyear = req.body.hsc_pyear;
   let hsc_percent = req.body.hsc_percent;
   let d_boardname = req.body.d_boardname;
   let d_sname = req.body.d_sname;
   let d_pyear = req.body.d_pyear;
   let d_percent = req.body.d_percent;
   let m_boardname = req.body.m_boardname;
   let m_sname = req.body.m_sname;
   let m_pyear = req.body.m_pyear;
   let m_percent = req.body.m_percent;
   let lang = req.body.lang;
   let lhskill = req.body.lhskill;
   let leskill = req.body.leskill;
   let lgskill = req.body.lgskill;
   let tech = req.body.tech;
   let tpskill = req.body.tpskill;
   let tjskill = req.body.tjskill;
   let toskill = req.body.toskill;
   let e_ctc = req.body.e_ctc;
   let c_ctc = req.body.c_ctc;
   let n_period = req.body.n_period;
   let location = req.body.location;
   let cname = req.body.cname;
   let pos = req.body.pos;
   let from = req.body.from;
   let to = req.body.to;
   let ename = req.body.ename;
   let edesign = req.body.edesign;
   let erelation = req.body.erelation;
   if (cname != undefined) {
       console.log(cname);
   }
   if (pos != undefined) {
       console.log(pos);
   }
   if (from != undefined) {
       console.log(from);
   }
   if (to != undefined) {
       console.log(to);
   }
   console.log("ename");
   console.log(ename);
   console.log("edesign");
   console.log(edesign);
   console.log("erelation");
   console.log(erelation);
   let eduObj = [];
   eduObj.push(["ssc", ssc_pyear, ssc_percent, ssc_boardname, ssc_sname]);
   eduObj.push(["hsc", hsc_pyear, hsc_percent, hsc_boardname, hsc_sname]);
   if (d_boardname != "" && d_percent != "" && d_pyear != "" && d_sname != "") {
       eduObj.push(["degree", d_pyear, d_percent, d_boardname, d_sname]);
   }
   if (m_boardname != "" && m_percent != "" && m_pyear != "" && m_sname != "") {
       eduObj.push(["master", m_pyear, m_percent, m_boardname, m_sname]);
   }
   console.log(eduObj);
   let dataObj = new Object();
   dataObj.fname = fname;
   dataObj.lname = lname;
   dataObj.design = design;
   dataObj.email = email;
   dataObj.add1 = add1;
   dataObj.add2 = add2;
   dataObj.state = state;
   dataObj.city = city;
   dataObj.zipcode = zipcode;
   dataObj.phone = phone;
   dataObj.ssc_boardname = ssc_boardname;
   dataObj.ssc_sname = ssc_sname;
   dataObj.ssc_pyear = ssc_pyear;
   dataObj.ssc_percent = ssc_percent;
   dataObj.hsc_boardname = hsc_boardname;
   dataObj.hsc_sname = hsc_sname;
   dataObj.hsc_pyear = hsc_pyear;
   dataObj.hsc_percent = hsc_percent;
   dataObj.d_boardname = d_boardname;
   dataObj.d_sname = d_sname;
   dataObj.d_pyear = d_pyear;
   dataObj.d_percent = d_percent;
   dataObj.m_boardname = m_boardname;
   dataObj.m_sname = m_sname;
   dataObj.m_pyear = m_pyear;
   dataObj.m_percent = m_percent;
   dataObj.e_ctc = e_ctc;
   dataObj.c_ctc = c_ctc;
   dataObj.n_period = n_period;
   dataObj.lang = lang;
   dataObj.lhskill = lhskill;
   dataObj.leskill = leskill;
   dataObj.lgskill = lgskill;
   dataObj.tech = tech;
   dataObj.tpskill = tpskill;
   dataObj.tjskill = tjskill;
   dataObj.toskill = toskill;
    
   let errorFlag = 0;
   let namePtn = /[a-zA-Z]/;
   let phonePtn = /[0-9]{10}/;
   let emailPtn = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
   let charPattern = /[0-9]/;
   let percentPtn = /^(\d{1,2}\.\d{1,2})$/;
   let yearPtn = /^(\d{1,2}\-\d{1,2}\-\d{4})$/;
   let ctcPtn = /^(\d{1,2}\.\d{1,2})$/;
   let period = /^[0-9]{2}$/;
   const errorObj = new Object();
   if (lang != undefined) {
       if (typeof lang != 'string') {
           if (lang.length != 0) {
               lang.forEach((element) => {
                   if (element == "hindi") {
                       if (lhskill.length == 0) {
                           errorObj.lang = "please select atleast one option for language hindi";
                           errorFlag++;
                       }
                   }
                   else if (element == "english") {
                       if (leskill.length == 0) {
                           errorObj.lang = "please select atleast one option for language english";
                           errorFlag++;
                       }
                   }
                   else {
                       if (lgskill.length == 0) {
                           errorObj.lang = "please select atleast one option for language guajrati";
                           errorFlag++;
                       }
                   }
               });
           }
           else {
               errorObj.lang = "";
           }
       }
       else {
           if (lang == "hindi") {
               if (lhskill == undefined) {
                   errorObj.lang = "please select atleast one option for language english";
                   errorFlag++;
               }

           }
           else if (lang == "english") {
               if (leskill == undefined) {
                   errorObj.lang = "please select atleast one option for language english";
                   errorFlag++;
               }

           }
           else {
               if (lgskill == undefined) {
                   errorObj.lang = "please select atleast one option for language gujarati";
                   errorFlag++;
               }
           }
       }
   }
   if (tech != undefined) {
       if (typeof tech != 'string') {
           if (tech.length != 0) {
               tech.forEach((element) => {
                   if (element == "php") {
                       if (tpskill == undefined) {
                           errorObj.tech = "please select your skill level in php";
                           errorFlag++;
                       }
                   }
                   else if (element == "Java") {
                       if (tjskill == undefined) {
                           errorObj.tech = "please select your skill level in java";
                           errorFlag++;
                       }
                   }
                   else {
                       if (toskill == undefined) {
                           errorObj.tech = "please select your skill level in oracle";
                           errorFlag++;
                       }
                   }
               });
           }
       }
       else {
           if (tech == "php") {
               if (tpskill == undefined) {
                   errorObj.tech = "please select your skill level in php";
                   errorFlag++;
               }
           }
           else if (tech == undefined) {
               if (tjskill == "") {
                   errorObj.tech = "please select your skill level in java";
                   errorFlag++;
               }
           }
           else {
               if (toskill == undefined) {
                   errorObj.tech = "please select your skill level in oracle";
                   errorFlag++;
               }
           }
       }
   }
   if (fname == "") {
       errorObj.fname = "please enter your first name";
       errorFlag++;
   }
   else if (!namePtn.test(fname)) {
       errorObj.fname = "your name should only contain characters";
       errorFlag++;
   }
   else {
       errorObj.fname = "";
   }
   if (lname == "") {
       errorObj.lname = "please enter your last name";
       errorFlag++;
   }
   else if (!namePtn.test(lname)) {
       errorObj.lname = "your name should only contain characters";
       errorFlag++;
   }
   else {
       errorObj.lname = "";
   }
   if (design == "") {
       errorObj.design = "please enter your designation";
       errorFlag++;
   }
   else {
       errorObj.design = "";
   }
   if (add1 == "") {
       errorObj.add1 = "please enter your address";
       errorFlag++;
   }
   else {
       errorObj.add1 = "";
   }
   if (email == "") {
       errorObj.email = "please enter your email";
       errorFlag++;
   }

   else {
       errorObj.email = "";
   }
   if (state == "") {
       errorObj.state = "Please enter your state name";
       errorFlag++;
   }
   else if (charPattern.test(state)) {
       errorObj.state = "digits are not allowed";
       errorFlag++;
   }
   else {
       errorObj.state = "";
   }
   if (city == "") {
       errorObj.city = "please enter your city name";
       errorFlag++;
   }
   else if (charPattern.test(city)) {
       errorObj.city = "only characters are allowed";
       errorFlag++;
   }
   else {
       errorObj.city = "";
   }
   if (zipcode == "") {
       errorObj.zipcode = "please enter your zipcode";
       errorFlag++;
   }
   if (phone == "") {
       errorObj.phone = "please enter your phone number";
       errorFlag++;
   }

   else {
       errorObj.phone = "";
   }
   if (ssc_boardname == "") {
       errorObj.ssc_boardname = "please enter your ssc course name";
       errorFlag++;
   }
   else if (charPattern.test(ssc_boardname)) {
       errorObj.ssc_boardname = "digits are not allowed";
       errorFlag++;
   }
   else {
       errorObj.ssc_boardname = "";
   }
   if (ssc_percent == "") {
       errorObj.ssc_percent = "please enter your ssc percent";
       errorFlag++;
   }

   else {
       errorObj.ssc_percent = "";
   }
   if (ssc_sname == "") {
       errorObj.ssc_sname = "please enter your school name";
       errorFlag++;
   }
   else if (charPattern.test(ssc_sname)) {
       errorObj.ssc_sname = "digits are not allowed";
       errorFlag++;
   }
   else {
       errorObj.ssc_sname = "";
   }
   if (ssc_pyear == "") {
       errorObj.ssc_pyear = "please enter your passing year";
       errorFlag++;
   }

   else {
       errorObj.ssc_pyear = "";
   }
   if (hsc_boardname == "") {
       errorObj.hsc_boardname = "please enter your course name";
       errorFlag++;
   }
   else if (charPattern.test(hsc_boardname)) {
       errorObj.hsc_boardname = "digits are not allowed";
       errorFlag++;
   }
   else {
       errorObj.hsc_boardname = "";
   }
   if (hsc_percent == "") {
       errorObj.hsc_percent = "please enter your percentage";
       errorFlag++;
   }

   else {
       errorObj.hsc_percent = "";
   }
   if (hsc_pyear == "") {
       errorObj.hsc_pyear = "please enter your passing year";
       errorFlag++;
   }

   else {
       errorObj.hsc_pyear = "";
   }
   if (hsc_sname == "") {
       errorObj.hsc_sname = "please enter your school name";
       errorFlag++;
   }
   else if (charPattern.test(hsc_sname)) {
       errorObj.hsc_sname = "digits are not allowed";
       errorFlag++;
   }
   else {
       errorObj.hsc_sname = "";
   }
   if (e_ctc == "") {
       errorObj.e_ctc = "please enter your expected ctc";
       errorFlag++;
   }

   else {
       errorObj.e_ctc = "";
   }
   if (c_ctc == "") {
       errorObj.c_ctc = "please enter your current ctc";
   }

   else {
       errorObj.c_ctc = "";
   }
   if (n_period == "") {
       errorObj.n_period = "please enter notice period";
       errorFlag++;
   }

   else {
       errorObj.n_period = "";
   }
   for(let i=0; i<cname.length; i++){
       if(cname[i]!=""){
           if(pos[i]=="" && from[i]=="" && to[i]==""){
               errorObj.experience="please fill all fields of experience";
               errorFlag++;
           }
       }
       if(pos[i]!=""){
           if(cname[i]=="" && from[i]=="" && to[i]==""){
               errorObj.experience="please fill all fields of experience";
               errorFlag++;
           }
       }
       if(from[i]!=""){
           if(cname[i]=="" && pos[i]=="" && to[i]==""){
               errorObj.experience="please fill all fields of experience";
               errorFlag++;
           }
       }
       if(to[i]!=""){
           if(cname[i]=="" && pos[i]=="" && from[i]==""){
               errorObj.experience="please fill all fields of experience";
               errorFlag++;
           }
       }
   }
   for(let i=0; i<ename.length; i++){
       if(ename[i]!=""){
           if(edesign[i]=="" && erelation[i]==""){
               errorObj.ref="please fill all fields of experience";
           }
       }
       if(edesign[i]!=""){
           if(ename[i]=="" && erelation[i]==""){
               errorObj.ref="please fill all fields of experience";
           }
       }
       if(erelation[i]!=""){
           if(edesign[i]=="" && ename[i]==""){
               errorObj.ref="please fill all fields of experience";
           }
       }
   }
   if (errorFlag != 0) {
       console.log(errorFlag);
       res.render('job_app_project_view/index', { dataObj: dataObj, errorObj: errorObj, isError: true, can:"",exp:"",edu:"",lang:"",tech:"",ref:"",pref:""});
   }
   else {

       let query = `insert into Candidate_Details (first_name, last_name, design, current_addreess, permanent_address,email,phone,city,state,gender,zip_code,relationship_status) values ("${fname}","${lname}","${design}",
       "${add1}","${add2}","${email}","${phone}","${city}","${state}","${gender}","${zipcode}","${relation}")`;
       conn.query(query, (err, result) => {
           if (err) {
               console.log(err);
           }
           else {
               let user_id = result.insertId;
               let query1 = `insert into preference(candidate_id,prefered_location,notice_period,department,current_ctc,expected_ctc) values (${user_id},"${location}","${n_period}","${design}",${c_ctc},${e_ctc});`;
               conn.query(query1, (err, result) => {
                   if (err) throw err;
               });
               eduObj.forEach((element) => {
                   let query2 = `insert into edu_master (candidate_id, course_type, passing_year, percent,course_name,school_name) values(${user_id},"${element[0]}","${element[1]}",${element[2]},"${element[3]}","${element[4]}")`;
                   conn.query(query2, (err, result) => {
                       if (err) throw err;
                   });
               });


               if (cname != undefined && pos != undefined && from != undefined && to != undefined) {
                   for (let i = 0; i < cname.length; i++) {
                       if (cname[i] != '' && pos[i] != '' && from[i] != '' && to[i] != '') {
                           let query13 = `insert into expreience (candidate_id,company_name,design,worked_from,worked_till) values(${user_id},"${cname[i]}","${pos[i]}","${from[i]}","${to[i]}");`;
                           conn.query(query13, (err, result) => {
                               if (err) throw err;
                           });
                       }
                   }
               }

               if (ename != undefined && edesign != undefined && erelation != undefined) {
                   for (let i = 0; i < ename.length; i++) {
                       if (ename[i] != '' && edesign != '' && erelation != '') {
                           let query14 = `insert into e_reference(candidate_id, e_name, e_design, e_relation) values(${user_id},"${ename[i]}","${edesign[i]}","${erelation[i]}");`;
                           conn.query(query14, (err, result) => {
                               if (err) throw err;
                           });
                       }
                   }
               }
               if (lang != undefined) {
                   if (typeof lang != 'string') {
                       for (let i = 0; i < lang.length; i++) {
                           if (lang[i] == "hindi") {
                               if (typeof lhskill != 'string') {
                                   lhskill.forEach(element => {
                                       let query11 = `insert into language_details (candidate_id, language, lang_skill) values (${user_id},"${lang[i]}","${element}");`;
                                       conn.query(query11, (err, result) => {
                                           if (err) throw err;
                                       });
                                   });
                               }
                               else {
                                   let query11 = `insert into language_details (candidate_id, language, lang_skill) values (${user_id},"${lang[i]}","${lhskill}");`;
                                   conn.query(query11, (err, result) => {
                                       if (err) throw err;
                                   });
                               }
                           }
                           else if (lang[i] == "english") {
                               if (typeof leskill != 'string') {
                                   leskill.forEach(element => {
                                       let query11 = `insert into language_details (candidate_id, language, lang_skill) values (${user_id},"${lang[i]}","${element}");`;
                                       conn.query(query11, (err, result) => {
                                           if (err) throw err;
                                       });
                                   });
                               }
                               else {
                                   let query11 = `insert into language_details (candidate_id, language, lang_skill) values (${user_id},"${lang[i]}","${leskill}");`;
                                   conn.query(query11, (err, result) => {
                                       if (err) throw err;
                                   });
                               }
                           }
                           else {
                               if (typeof lgskill != 'string') {
                                   lgskill.forEach(element => {
                                       let query11 = `insert into language_details (candidate_id, language, lang_skill) values (${user_id},"${lang[i]}","${element}");`;
                                       conn.query(query11, (err, result) => {
                                           if (err) throw err;
                                       });
                                   });
                               }
                               else {
                                   let query11 = `insert into language_details (candidate_id, language, lang_skill) values (${user_id},"${lang[i]}","${lgskill}");`;
                                   conn.query(query11, (err, result) => {
                                       if (err) throw err;
                                   });
                               }
                           }
                       }
                   }
                   else {
                       if (lang == "hindi") {
                           if (typeof lhskill != 'string') {
                               lhskill.forEach(element => {
                                   let query11 = `insert into language_details (candidate_id, language, lang_skill) values (${user_id},"${lang}","${element}");`;
                                   conn.query(query11, (err, result) => {
                                       if (err) throw err;
                                   });
                               });
                           }
                           else {
                               let query11 = `insert into language_details (candidate_id, language, lang_skill) values (${user_id},"${lang}","${lhskill}");`;
                               conn.query(query11, (err, result) => {
                                   if (err) throw err;
                               });
                           }
                       }
                       else if (lang == "english") {
                           if (typeof leskill != 'string') {
                               leskill.forEach(element => {
                                   let query11 = `insert into language_details (candidate_id, language, lang_skill) values (${user_id},"${lang}","${element}");`;
                                   conn.query(query11, (err, result) => {
                                       if (err) throw err;
                                   });
                               });
                           }
                           else {
                               let query11 = `insert into language_details (candidate_id, language, lang_skill) values (${user_id},"${lang}","${leskill}");`;
                               conn.query(query11, (err, result) => {
                                   if (err) throw err;
                               });
                           }
                       }
                       else {
                           if (typeof lgskill != 'string') {
                               lgskill.forEach(element => {
                                   let query11 = `insert into language_details (candidate_id, language, lang_skill) values (${user_id},"${lang}","${element}");`;
                                   conn.query(query11, (err, result) => {
                                       if (err) throw err;
                                   });
                               });
                           }
                           else {
                               let query11 = `insert into language_details (candidate_id, language, lang_skill) values (${user_id},"${lang}","${lgskill}");`;
                               conn.query(query11, (err, result) => {
                                   if (err) throw err;
                               });
                           }
                       }
                   }
               }
             if(tech!=undefined){
               if (typeof tech != 'string') {
                   for (let i = 0; i < tech.length; i++) {
                       if (tech[i] == "php") {
                           let query12 = `insert into tech_details (candidate_id, tech, tech_skill) values(${user_id},"${tech[i]}","${tpskill}");`;
                           conn.query(query12, (err, result) => {
                               if (err) throw err;
                           });
                       }
                       else if (tech[i] == "Java") {
                           let query12 = `insert into tech_details (candidate_id, tech, tech_skill) values(${user_id},"${tech[i]}","${tjskill}");`;
                           conn.query(query12, (err, result) => {
                               if (err) throw err;
                           });
                       }
                       else {
                           let query12 = `insert into tech_details (candidate_id, tech, tech_skill) values(${user_id},"${tech[i]}","${toskill}");`;
                           conn.query(query12, (err, result) => {
                               if (err) throw err;
                           });
                       }
                   }
               }
               else {
                   if (tech == "php") {
                       let query12 = `insert into tech_details (candidate_id, tech, tech_skill) values(${user_id},"${tech}","${tpskill}");`;
                       conn.query(query12, (err, result) => {
                           if (err) throw err;
                       });
                   }
                   else if (tech == "Java") {
                       let query12 = `insert into tech_details (candidate_id, tech, tech_skill) values(${user_id},"${tech}","${tjskill}");`;
                       conn.query(query12, (err, result) => {
                           if (err) throw err;
                       });
                   }
                   else {
                       let query12 = `insert into tech_details (candidate_id, tech, tech_skill) values(${user_id},"${tech}","${toskill}");`;
                       conn.query(query12, (err, result) => {
                           if (err) throw err;
                       });
                   }
               }
           }
       }
       });
       res.render('job_app_project_view/index', { dataObj: "", errorObj: "", isError: false ,isUpdate:false, can:"",exp:"",edu:"",lang:"",tech:"",ref:"",pref:""});
       res.end();
   }

});
app.get('/job_app_form_list',(req,res)=>{
async function fetch_Can_Details(){
   return promise = new Promise((resolve,reject)=>{
       let query='select * from Candidate_Details;';
       conn.query(query,(err,result)=>{
              if(err) throw err;
              resolve(result);
       });
   })
}
async function fetch_Edu_Details(){
   return promise = new Promise((resolve,reject)=>{
       let query='select * from edu_master;';
       conn.query(query,(err,result)=>{
              if(err) throw err;
              resolve(result);
       });
   })
}

async function fetch_Exp_Details(){
   return promise = new Promise((resolve,reject)=>{
       let query='select * from expreience;';
       conn.query(query,(err,result)=>{
              if(err) throw err;
              resolve(result);
       });
   })
}

async function fetch_Ref_Details(){
   return promise = new Promise((resolve,reject)=>{
       let query='select * from e_reference;';
       conn.query(query,(err,result)=>{
              if(err) throw err;
              resolve(result);
       });
   });
}
async function fetch_Pref_Details(){
   return promise = new Promise((resolve,reject)=>{
       let query='select * from preference;';
       conn.query(query,(err,result)=>{
              if(err) throw err;
              resolve(result);
       });
   })
}
async function fetch_Lang_Details(){
   return promise = new Promise((resolve,reject)=>{
       let query='select * from language_details;';
       conn.query(query,(err,result)=>{
              if(err) throw err;
              resolve(result);
       });
   })
}
async function fetch_Tech_Details(){
   return promise = new Promise((resolve,reject)=>{
       let query='select * from tech_details;';
       conn.query(query,(err,result)=>{
              if(err) throw err;
              resolve(result);
       });
   })
}
async function renderData(){
   let can=await fetch_Can_Details();
   let exp=await fetch_Exp_Details();
   let edu=await fetch_Edu_Details();
   let lang=await fetch_Lang_Details();
   let tech= await fetch_Tech_Details();
   let ref=await fetch_Ref_Details();
   let pref= await fetch_Pref_Details();
   res.render('job_app_project_view/list',{can:can,exp:exp,edu:edu,lang:lang,tech:tech,ref:ref,pref:pref});
   res.end();
}
renderData();
});
app.get('/update',(req,res)=>{
   let id = parseInt(req.query.id);
   console.log(id);
   async function fetch_Can_Details(){
       return promise = new Promise((resolve,reject)=>{
           let query=`select * from Candidate_Details where candidate_id=${id};`;
           conn.query(query,(err,result)=>{
                  if(err) throw err;
                  resolve(result);
           });
       })
   }
   async function fetch_Edu_Details(){
       return promise = new Promise((resolve,reject)=>{
           let query=`select * from edu_master where candidate_id=${id};`;
           conn.query(query,(err,result)=>{
                  if(err) throw err;
                  resolve(result);
           });
       })
   }
   
   async function fetch_Exp_Details(){
       return promise = new Promise((resolve,reject)=>{
           let query=`select * from expreience where candidate_id=${id};`;
           conn.query(query,(err,result)=>{
                  if(err) throw err;
                  resolve(result);
           });
       })
   }
   
   async function fetch_Ref_Details(){
       return promise = new Promise((resolve,reject)=>{
           let query=`select * from e_reference where candidate_id=${id};`;
           conn.query(query,(err,result)=>{
                  if(err) throw err;
                  resolve(result);
           });
       });
   }
   async function fetch_Pref_Details(){
       return promise = new Promise((resolve,reject)=>{
           let query=`select * from preference where candidate_id=${id};`;
           conn.query(query,(err,result)=>{
                  if(err) throw err;
                  resolve(result);
           });
       })
   }
   async function fetch_Lang_Details(){
       return promise = new Promise((resolve,reject)=>{
           let query=`select * from language_details where candidate_id=${id};`;
           conn.query(query,(err,result)=>{
                  if(err) throw err;
                  resolve(result);
           });
       })
   }
   async function fetch_Tech_Details(){
       return promise = new Promise((resolve,reject)=>{
           let query=`select * from tech_details where candidate_id=${id};`;
           conn.query(query,(err,result)=>{
                  if(err) throw err;
                  resolve(result);
           });
       })
   }

   async function renderData(){
       let can=await fetch_Can_Details();
       
        console.log(can);
       let exp=await fetch_Exp_Details();
       
       console.log(exp);
       let edu=await fetch_Edu_Details();
       console.log(edu);
       let lang=await fetch_Lang_Details();
       console.log(lang);
       let tech= await fetch_Tech_Details();
       console.log(tech);

       let ref=await fetch_Ref_Details();
       console.log(ref);
      
       let pref= await fetch_Pref_Details();
       console.log(pref);

res.render('job_app_project_view/index',{dataObj:"",errorObj:"", isError:false,isUpdate:true, can:can,exp:exp,edu:edu,lang:lang,tech:tech,ref:ref,pref:pref});
res.end();
   }
   renderData();
  
});
app.post('/updated',(req,res)=>{
 console.log(req.body);
 let id= req.body.id;
 let fname = req.body.fname;
   let lname = req.body.lname;
   let design = req.body.design;
   let email = req.body.email;
   let add1 = req.body.add1;
   let add2 = req.body.add2;
   let state = req.body.state;
   let city = req.body.city;
   let gender = req.body.gender;
   let zipcode = req.body.zipcode;
   let phone = req.body.phone;
   let relation = req.body.relation;
   let ssc_boardname = req.body.ssc_boardname;
   let ssc_sname = req.body.ssc_sname;
   let ssc_pyear = req.body.ssc_pyear;
   let ssc_percent = req.body.ssc_percent;
   let hsc_boardname = req.body.hsc_boardname;
   let hsc_sname = req.body.hsc_sname;
   let hsc_pyear = req.body.hsc_pyear;
   let hsc_percent = req.body.hsc_percent;
   let d_boardname = req.body.d_boardname;
   let d_sname = req.body.d_sname;
   let d_pyear = req.body.d_pyear;
   let d_percent = req.body.d_percent;
   let m_boardname = req.body.m_boardname;
   let m_sname = req.body.m_sname;
   let m_pyear = req.body.m_pyear;
   let m_percent = req.body.m_percent;
   let lang = req.body.lang;
   let lhskill = req.body.lhskill;
   let leskill = req.body.leskill;
   let lgskill = req.body.lgskill;
   let tech = req.body.tech;
   let tpskill = req.body.tpskill;
   let tjskill = req.body.tjskill;
   let toskill = req.body.toskill;
   let e_ctc = req.body.e_ctc;
   let c_ctc = req.body.c_ctc;
   let n_period = req.body.n_period;
   let location = req.body.location;
   let cname = req.body.cname;
   let pos = req.body.pos;
   let from = req.body.from;
   let to = req.body.to;
   let ename = req.body.ename;
   let edesign = req.body.edesign;
   let erelation = req.body.erelation;
   let langObj= new Object();
   if(lang!=undefined){
   lang.forEach((element)=>{
     if(element=='hindi'){
       if(lhskill!=undefined){
       langObj.hindi=lhskill;
       }
     }
     if(element=='english'){
       if(leskill!=undefined){
           langObj.english=leskill;
       }
     }
     if(element=='gujararti'){
       if(lgskill!=undefined){
           langObj.gujarati=lgskill;
       }
     }
   });
}
   const techObj=new Object();
      if(tech!=undefined){
       tech.forEach((element)=>{
           if(element=="php"){
               if(tpskill!=undefined){
               techObj.php=tpskill;
               }
           }
           if(element=="Java"){
               if(tjskill!=undefined){
                   techObj.Java=tjskill;
               }
           }
           if(element=='oracle'){
               if(toskill!=undefined){
                   techObj.oracle=toskill;
               }
           }
       });
      }
   if (cname != undefined) {
       console.log(cname);
   }
   if (pos != undefined) {
       console.log(pos);
   }
   if (from != undefined) {
       console.log(from);
   }
   if (to != undefined) {
       console.log(to);
   }
   console.log("ename");
   console.log(ename);
   console.log("edesign");
   console.log(edesign);
   console.log("erelation");
   console.log(erelation);
   let eduObj = [];
   eduObj.push(["ssc", ssc_pyear, ssc_percent, ssc_boardname, ssc_sname]);
   eduObj.push(["hsc", hsc_pyear, hsc_percent, hsc_boardname, hsc_sname]);
   if (d_boardname != "" && d_percent != "" && d_pyear != "" && d_sname != "") {
       eduObj.push(["degree", d_pyear, d_percent, d_boardname, d_sname]);
   }
   if (m_boardname != "" && m_percent != "" && m_pyear != "" && m_sname != "") {
       eduObj.push(["master", m_pyear, m_percent, m_boardname, m_sname]);
   }
   console.log(eduObj);


   let dataObj = new Object();
   dataObj.fname = fname;
   dataObj.lname = lname;
   dataObj.design = design;
   dataObj.email = email;
   dataObj.add1 = add1;
   dataObj.add2 = add2;
   dataObj.state = state;
   dataObj.city = city;
   dataObj.zipcode = zipcode;
   dataObj.phone = phone;
   dataObj.ssc_boardname = ssc_boardname;
   dataObj.ssc_sname = ssc_sname;
   dataObj.ssc_pyear = ssc_pyear;
   dataObj.ssc_percent = ssc_percent;
   dataObj.hsc_boardname = hsc_boardname;
   dataObj.hsc_sname = hsc_sname;
   dataObj.hsc_pyear = hsc_pyear;
   dataObj.hsc_percent = hsc_percent;
   dataObj.d_boardname = d_boardname;
   dataObj.d_sname = d_sname;
   dataObj.d_pyear = d_pyear;
   dataObj.d_percent = d_percent;
   dataObj.m_boardname = m_boardname;
   dataObj.m_sname = m_sname;
   dataObj.m_pyear = m_pyear;
   dataObj.m_percent = m_percent;
   dataObj.e_ctc = e_ctc;
   dataObj.c_ctc = c_ctc;
   dataObj.n_period = n_period;
   dataObj.lang = lang;
   dataObj.lhskill = lhskill;
   dataObj.leskill = leskill;
   dataObj.lgskill = lgskill;
   dataObj.tech = tech;
   dataObj.tpskill = tpskill;
   dataObj.tjskill = tjskill;
   dataObj.toskill = toskill;
    
   let errorFlag = 0;
   let namePtn = /[a-zA-Z]/;
   let phonePtn = /[0-9]{10}/;
   let emailPtn = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
   let charPattern = /[0-9]/;
   let percentPtn = /^(\d{1,2}\.\d{1,2})$/;
   let yearPtn = /^(\d{1,2}\-\d{1,2}\-\d{4})$/;
   let ctcPtn = /^(\d{1,2}\.\d{1,2})$/;
   let period = /^[0-9]{2}$/;
   const errorObj = new Object();
   if (lang != undefined) {
       if (typeof lang != 'string') {
           if (lang.length != 0) {
               lang.forEach((element) => {
                   if (element == "hindi") {
                       if (lhskill.length == 0) {
                           errorObj.lang = "please select atleast one option for language hindi";
                           errorFlag++;
                       }
                   }
                   else if (element == "english") {
                       if (leskill.length == 0) {
                           errorObj.lang = "please select atleast one option for language english";
                           errorFlag++;
                       }
                   }
                   else {
                       if (lgskill.length == 0) {
                           errorObj.lang = "please select atleast one option for language guajrati";
                           errorFlag++;
                       }
                   }
               });
           }
           else {
               errorObj.lang = "";
           }
       }
       else {
           if (lang == "hindi") {
               if (lhskill == undefined) {
                   errorObj.lang = "please select atleast one option for language english";
                   errorFlag++;
               }

           }
           else if (lang == "english") {
               if (leskill == undefined) {
                   errorObj.lang = "please select atleast one option for language english";
                   errorFlag++;
               }

           }
           else {
               if (lgskill == undefined) {
                   errorObj.lang = "please select atleast one option for language gujarati";
                   errorFlag++;
               }
           }
       }
   }
   if (tech != undefined) {
       if (typeof tech != 'string') {
           if (tech.length != 0) {
               tech.forEach((element) => {
                   if (element == "php") {
                       if (tpskill == undefined) {
                           errorObj.tech = "please select your skill level in php";
                           errorFlag++;
                       }
                   }
                   else if (element == "Java") {
                       if (tjskill == undefined) {
                           errorObj.tech = "please select your skill level in java";
                           errorFlag++;
                       }
                   }
                   else {
                       if (toskill == undefined) {
                           errorObj.tech = "please select your skill level in oracle";
                           errorFlag++;
                       }
                   }
               });
           }
       }
       else {
           if (tech == "php") {
               if (tpskill == undefined) {
                   errorObj.tech = "please select your skill level in php";
                   errorFlag++;
               }
           }
           else if (tech == undefined) {
               if (tjskill == "") {
                   errorObj.tech = "please select your skill level in java";
                   errorFlag++;
               }
           }
           else {
               if (toskill == undefined) {
                   errorObj.tech = "please select your skill level in oracle";
                   errorFlag++;
               }
           }
       }
   }
   if (fname == "") {
       errorObj.fname = "please enter your first name";
       errorFlag++;
   }
   else if (!namePtn.test(fname)) {
       errorObj.fname = "your name should only contain characters";
       errorFlag++;
   }
   else {
       errorObj.fname = "";
   }
   if (lname == "") {
       errorObj.lname = "please enter your last name";
       errorFlag++;
   }
   else if (!namePtn.test(lname)) {
       errorObj.lname = "your name should only contain characters";
       errorFlag++;
   }
   else {
       errorObj.lname = "";
   }
   if (design == "") {
       errorObj.design = "please enter your designation";
       errorFlag++;
   }
   else {
       errorObj.design = "";
   }
   if (add1 == "") {
       errorObj.add1 = "please enter your address";
       errorFlag++;
   }
   else {
       errorObj.add1 = "";
   }
   if (email == "") {
       errorObj.email = "please enter your email";
       errorFlag++;
   }

   else {
       errorObj.email = "";
   }
   if (state == "") {
       errorObj.state = "Please enter your state name";
       errorFlag++;
   }
   else if (charPattern.test(state)) {
       errorObj.state = "digits are not allowed";
       errorFlag++;
   }
   else {
       errorObj.state = "";
   }
   if (city == "") {
       errorObj.city = "please enter your city name";
       errorFlag++;
   }
   else if (charPattern.test(city)) {
       errorObj.city = "only characters are allowed";
       errorFlag++;
   }
   else {
       errorObj.city = "";
   }
   if (zipcode == "") {
       errorObj.zipcode = "please enter your zipcode";
       errorFlag++;
   }
   if (phone == "") {
       errorObj.phone = "please enter your phone number";
       errorFlag++;
   }

   else {
       errorObj.phone = "";
   }
   if (ssc_boardname == "") {
       errorObj.ssc_boardname = "please enter your ssc course name";
       errorFlag++;
   }
   else if (charPattern.test(ssc_boardname)) {
       errorObj.ssc_boardname = "digits are not allowed";
       errorFlag++;
   }
   else {
       errorObj.ssc_boardname = "";
   }
   if (ssc_percent == "") {
       errorObj.ssc_percent = "please enter your ssc percent";
       errorFlag++;
   }

   else {
       errorObj.ssc_percent = "";
   }
   if (ssc_sname == "") {
       errorObj.ssc_sname = "please enter your school name";
       errorFlag++;
   }
   else if (charPattern.test(ssc_sname)) {
       errorObj.ssc_sname = "digits are not allowed";
       errorFlag++;
   }
   else {
       errorObj.ssc_sname = "";
   }
   if (ssc_pyear == "") {
       errorObj.ssc_pyear = "please enter your passing year";
       errorFlag++;
   }

   else {
       errorObj.ssc_pyear = "";
   }
   if (hsc_boardname == "") {
       errorObj.hsc_boardname = "please enter your course name";
       errorFlag++;
   }
   else if (charPattern.test(hsc_boardname)) {
       errorObj.hsc_boardname = "digits are not allowed";
       errorFlag++;
   }
   else {
       errorObj.hsc_boardname = "";
   }
   if (hsc_percent == "") {
       errorObj.hsc_percent = "please enter your percentage";
       errorFlag++;
   }

   else {
       errorObj.hsc_percent = "";
   }
   if (hsc_pyear == "") {
       errorObj.hsc_pyear = "please enter your passing year";
       errorFlag++;
   }

   else {
       errorObj.hsc_pyear = "";
   }
   if (hsc_sname == "") {
       errorObj.hsc_sname = "please enter your school name";
       errorFlag++;
   }
   else if (charPattern.test(hsc_sname)) {
       errorObj.hsc_sname = "digits are not allowed";
       errorFlag++;
   }
   else {
       errorObj.hsc_sname = "";
   }
   if (e_ctc == "") {
       errorObj.e_ctc = "please enter your expected ctc";
       errorFlag++;
   }

   else {
       errorObj.e_ctc = "";
   }
   if (c_ctc == "") {
       errorObj.c_ctc = "please enter your current ctc";
   }

   else {
       errorObj.c_ctc = "";
   }
   if (n_period == "") {
       errorObj.n_period = "please enter notice period";
       errorFlag++;
   }

   else {
       errorObj.n_period = "";
   }
   for(let i=0; i<cname.length; i++){
       if(cname[i]!=""){
           if(pos[i]=="" && from[i]=="" && to[i]==""){
               errorObj.experience="please fill all fields of experience";
               errorFlag++;
           }
       }
       if(pos[i]!=""){
           if(cname[i]=="" && from[i]=="" && to[i]==""){
               errorObj.experience="please fill all fields of experience";
               errorFlag++;
           }
       }
       if(from[i]!=""){
           if(cname[i]=="" && pos[i]=="" && to[i]==""){
               errorObj.experience="please fill all fields of experience";
               errorFlag++;
           }
       }
       if(to[i]!=""){
           if(cname[i]=="" && pos[i]=="" && from[i]==""){
               errorObj.experience="please fill all fields of experience";
               errorFlag++;
           }
       }
   }
   for(let i=0; i<ename.length; i++){
       if(ename[i]!=""){
           if(edesign[i]=="" && erelation[i]==""){
               errorObj.ref="please fill all fields of experience";
           }
       }
       if(edesign[i]!=""){
           if(ename[i]=="" && erelation[i]==""){
               errorObj.ref="please fill all fields of experience";
           }
       }
       if(erelation[i]!=""){
           if(edesign[i]=="" && ename[i]==""){
               errorObj.ref="please fill all fields of experience";
           }
       }
   }
   if (errorFlag != 0) {
       console.log(errorFlag);
       res.render('index', { dataObj: dataObj, errorObj: errorObj, isError: true, can:"",exp:"",edu:"",lang:"",tech:"",ref:"",pref:""});
   }
   else{
       let query1 = `update Candidate_Details set first_name="${fname}", last_name="${lname}", design="${design}", current_addreess="${add1}", permanent_address="${add2}", email="${email}", phone="${phone}", city="${city}" , state="${state}", gender="${gender}", zip_code="${zipcode}", relationship_status="${relation}" where candidate_id=${id};`;
       conn.query(query1,(err,result)=>{
             if(err) throw err;
             console.log("successfully update candidate details");
       });
       eduObj.forEach((element)=>{
           let query2=`update edu_master set course_name="${element[3]}", school_name="${element[4]}",passing_year="${element[1]}", percent=${element[2]} where candidate_id=${id} and course_type="${element[0]}";`;
           conn.query(query1,(err,result)=>{
             if(err) throw err;
             console.log("successfully update education details");
       });
       });

   console.log(langObj);
   console.log(techObj);
  if(langObj.length!=0){
   let keys = Object.keys(langObj);
   keys.forEach((element)=>{
       if(element=="hindi"){
           if(typeof langObj.hindi =='string'){
               let query3=`update language_details set language="${element}", lang_skill="${langObj.hidi}" where candidate_id=${id};`;
               conn.query(query3,(err,result)=>{
                   if(err) throw err;
                   console.log("successfully added lang");
             });
           }
           else{
               langObj.hindi.forEach((item)=>{
                   let query3=`update language_details set language="${element}", lang_skill="${item}" where candidate_id=${id};`;
                   conn.query(query3,(err,result)=>{
                       if(err) throw err;
                       console.log("successfully added lang");
                 });
               });
           }
       }
       if(element=="english"){
           if(typeof langObj.english =='string'){
               let query3=`update language_details set language="${element}", lang_skill="${langObj.english}" where candidate_id=${id};`;
               conn.query(query3,(err,result)=>{
                   if(err) throw err;
                   console.log("successfully added lang");
             });
           }
           else{
               langObj.english.forEach((item)=>{
                   let query3=`update language_details set language="${element}", lang_skill="${item}" where candidate_id=${id};`;
                   conn.query(query3,(err,result)=>{
                       if(err) throw err;
                       console.log("successfully added lang");
                 });
               });
           }
       }

       if(element=="gujararti"){
           if(typeof langObj.gujarati =='string'){
               let query3=`update language_details set language="${element}", lang_skill="${langObj.gujarati}" where candidate_id=${id};`;
               conn.query(query3,(err,result)=>{
                   if(err) throw err;
                   console.log("successfully added lang");
             });
           }
           else{
               langObj.gujarati.forEach((item)=>{
                   let query3=`update language_details set language="${element}", lang_skill="${item}" where candidate_id=${id};`;
                   conn.query(query3,(err,result)=>{
                       if(err) throw err;
                       console.log("successfully added lang");
                 });
               });
           }
       }
   });
  }

  if(techObj.length!=0){
   for(const [key,value] of Object.entries(techObj)){
       let query4=`update tech_details set tech="${key}" , tech_skill="${value}" where candidate_id=${id};`;
       conn.query(query4,(err,result)=>{
           if(err) throw err;
           console.log("successfully added tech");
     });
   }
  }

  if(cname!=undefined && design!=undefined && from!=undefined && to!=undefined){
   if(cname[0]!="" && pos[0]!="" && from[0]!="" && to[0]!=""){
       let query5=`update expreience set company_name="${cname[0]}", design="${pos[0]}", worked_from="${from[0]}", worked_till="${to[0]}" where candidate_id=${id};`;
       conn.query(query5,(err,result)=>{
           if(err) throw err;
           console.log("successfully added expereience");
     });
   }
  }

  if(ename!=undefined && edesign!=undefined && erelation!=undefined){
  if(ename[0]!="" && edesign[0]!="" && erelation[0]!=""){
    let query6=`update  e_reference set e_name="${ename[0]}", e_design="${edesign[0]}", e_relation="${erelation[0]}" where candidate_id=${id};`;
    conn.query(query6,(err,result)=>{
       if(err) throw err;
       console.log("successfully added references");
 });
  }
  }

  let query7=`update preference set prefered_location="${location}", notice_period="${n_period}", department="${design}", current_ctc=${c_ctc}, expected_ctc=${e_ctc} where candidate_id=${id};`;
  conn.query(query7,(err,result)=>{
   if(err) throw err;
   console.log("successfully added preferences");
});

 res.render('job_app_project_view/index',{ dataObj: "", errorObj: "", isError: false ,isUpdate:false, can:"",exp:"",edu:"",lang:"",tech:"",ref:"",pref:""});
 res.end();
   }
});

// simplpe sorting
app.get('/sorting',(req,res)=>{
   res.render('sorting_in_js');
   res.end();
 });
 
 app.get('/dynamic_cube',(req,res)=>{
   res.render('assign1');
   res.end();
 });

 
app.listen(8080);