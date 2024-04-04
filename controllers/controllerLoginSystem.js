const { insertUser, findById, updatePassword, findByValue, deleteById , findAll} = require('../models/sql_function');

const openLoginSystem = (req, res) => {
    res.render('login_system_views/index', { errMsg: "", id: 0, otp: 0, isReg: false });
    res.end();
}

const registerUser = async (req, res) => {
    console.log("here its server");
    console.log(req.body);
    await insertUser(obj);
}

const openPasswordPage = (req, res) => {
    let id = req.query.id;
    let otp = req.query.otp;
    res.render('login_system_views/password', { id: id, otp: otp, isSuccess: false, errMsg: "" });
    res.end();
}
const createPassword = async (req, res) => {
    let id = req.body.id;
    let pass = req.body.upass;
    let u_otp = req.body.otp;
    console.log(u_otp);
    let result = await findById('users', 'user_id', id);
    if (result.length == 0) {
        res.render('login_system_views/password', { id: 0, otp: u_otp, isSuccess: false, errMsg: "user does not exist please register first" });
        res.end();
    }
    else {
        let password = md5(result[0].u_salt + pass);
        let result = await updatePassword(password, id, u_otp)
        if (result.length != 0) {
            console.log("update successfully");
            res.render('login_system_views/password', { id: 0, otp: u_otp, isSuccess: true, errMsg: "" });
            res.end();
        }
    }
}
const openLoginPage = (req, res) => {
    res.render('login_system_views/login', { email: "", errMsg: "", successMsg: "" });
    res.end();
}

const loginUser =async (req, res) => {
    let email = req.body.email;
    let pass = req.body.pass;
    let result = await findByValue('users', 'u_email', email);
    if (result.length == 0) {
        let errMsg = 'invalid username or password';
        res.render('login_system_views/login', { email: email, errMsg: errMsg, successMsg: "" });
        res.end();
    }
    else {
        let dbpass = result[0].u_pass;
        let salt = result[0].u_salt;
        let u_email = result[0].u_email;
        let u_name = result[0].u_name;
        let newPass = md5(salt + pass);
        if (dbpass != newPass) {
            let errMsg = 'invalid username or password';
            res.render('login_system_views/login', { email: email, errMsg: errMsg, successMsg: "" });
            res.end();
        }
        else {
            let successMsg = "Logged in Successfully";
            const token = jwt.sign({ email: u_email }, SECRET_KEY);
            res.cookie('token', token, {
                maxAge: 1000 * 60 * 60 * 2,
                httpOnly: true,
            });
            res.render('login_system_views/home', { u_name: u_name });
            res.end();
        }
    }
}

const checkdb = async (req,res)=>{
        let id = req.query.id;
        let result = await findById('users' , 'user_id', id);
           if (result[0].u_pass == null) {
            let result1 = await deleteById('users', 'user_id', id);
            if(result1.length!=0){
                console.log("successfully deleted");
            }
           }
        
}

const forgetPass = async (req,res)=>{
        let email = req.query.email;
        if (email == "") {
           let errMsg = "please try first";
           res.render('login_system_views/login', { email: "", errMsg: errMsg, successMsg: "" });
           res.end();
        }
        else {
        let result = await findByValue('users', 'u_email', email)
              if (result.length != 0) {
                 let id = result[0].user_id;
                 let otp = result[0].u_otp;
                 if (result[0].u_pass != null) {
                    res.render('login_system_views/password', { id: id, otp: otp, isSuccess: false, errMsg: "" });
                    res.end();
                 }
              }
              else {
                 let errMsg = "Invalid credentials";
                 res.render('login_system_views/login', { email: "", errMsg: errMsg, successMsg: "" });
                 res.end();
              }
        }
}

const displayList = async (req,res)=>{
    let token = req.headers.cookie.split("=")[1];
    if (token) {
       console.log(token);
       let result = await findAll('users');
       if(result.length!=0){
        res.render('login_system_views/list', { result: result });
        res.end();
       }
    }
    else {
       let errMsg = "You need to login first";
       res.render('login_system_views/login', { email: "", errMsg: errMsg, successMsg: "" });
       res.end();
    }
}

const openHomePage = (req,res)=>{
    res.render('home');
    res.end();
}

const logoutUser = (req,res)=>{
    res.clearCookie("token");
    res.render('login_system_views/login', { email: "", errMsg: "", successMsg: "" });
    res.end();
}
module.exports = { openLoginSystem, registerUser, openPasswordPage, createPassword, openLoginPage, loginUser, checkdb , forgetPass, displayList, openHomePage, logoutUser};