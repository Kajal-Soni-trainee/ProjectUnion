const express = require('express');
const functions= require('./middleware.js');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
global.document = new JSDOM('html').window.document;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
const conn  = require("./mysql.js");

app.get('/',(req,res)=>{  
let element=`<p></p>`;
res.render('index',{element:element});
res.end();
});

/*app.get('/',(req,res)=>{
    res.render('index');
    res.end();
})*/
app.post('/',(req,res)=>{
let name=req.body.component_name;
let type=req.body.component_type;
functions.component(name,type).then((element)=>{
    console.log( element);
 res.render('index',{element:element});
    res.end();
}).catch((err)=>{
    console.log(err);
});
});
app.listen(8000);