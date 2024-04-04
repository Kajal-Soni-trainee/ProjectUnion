const checkSession = function (req, res, next) {
    if (req.session.user) {
        next();
    }
    else {
        // res.send("user is not logged in");
        res.redirect('simple_crud/login');
        res.end();
    }
}

const validateForm = (obj) => {
    const fname = obj.fname;
    const lname = obj.lname;
    const age = obj.age;
    const pass = obj.pass;
    const con = obj.con;
    const gen = obj.gen;
    const hobby = obj.hobbies;
    const email = obj.email;
    const add = obj.add;

    const dataObj = new Object();
    dataObj.fname = fname;
    dataObj.lname = lname;
    dataObj.age = age;
    dataObj.pass = pass;
    dataObj.con = con;
    dataObj.gen = gen;
    dataObj.hobby = hobby;
    dataObj.email = email;
    dataObj.add = add;

    const errElement = new Object();
    let errFlag = 0;
    if (fname == "") {
        errElement.fname = "please enter your first name";
        errFlag++;
    }
    else if (fname.length > 15) {
        errElement.fname = "your first name is exceeding the maximum length";
    }
    else {
        errElement.fname = "";
    }
    if (lname == "") {
        errElement.lname = "please enter your last name";
        errFlag++;
    }
    else if (lname.length > 15) {
        errElement.fname = "your last name is exceeding the maximum length";
    }
    else {
        errElement.lname = "";
    }
    if (age == "") {
        errElement.age = "please enter your age";
        errFlag++;
    }

    else if (!/^[0-9]{2}$/.test(age)) {
        errElement.age = "your age should be number";
    }
    else if (age < 15 && age > 25) {
        errElement.age = "your age should be greater than 15 and less than 25";
    }
    else {
        errElement.age = "";
    }
    if (pass == "") {
        errElement.pass = "please enter your password";
        errFlag++;
    }
    else {
        errElement.pass = "";
    }
    if (con == "") {
        errElement.con = "please enter your contact";
        errFlag++;
    }
    else if (!/^[0-9]{10}$/.test(con)) {
        errElement.con = "your phone number should contain only 10 digits"
    }
    else {
        errElement.con = "";
    }
    if (gen == undefined) {
        errElement.gen = "please enter your gender";
        errFlag++;
    }
    else {
        errElement.gen = "";
    }
    if (hobby == undefined) {
        errElement.hobby = "please enter your hobby";
        errFlag++;
    }
    else {
        errElement.hobby = "";
    }
    if (email == "") {
        errElement.email = "please enter your email";
        errFlag++;
    }
    else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        errElement.email = "please enter a valid email";
    }
    else {
        errElement.email = "";
    }
    if (add == "") {
        errElement.add = "please enter your add";
        errFlag++;
    }
    else {
        errElement.add = "";
    }

    return [errElement, dataObj, errFlag];
}



module.exports = { checkSession , validateForm};