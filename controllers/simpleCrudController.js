const { validateForm } = require('../middlewares/simpleCrudFunctions');
const { insertStudentDetails, validateUserLogin, updateUserSql } = require('../models/simpleCrudSql');
const { findAll, findById, deleteById } = require('../models/sql_function');
const registerUser = async (req, res) => {

    const validateResult = validateForm(req.body);
    let errElement = validateResult[0];
    let dataObj = validateResult[1];
    let errFlag = validateResult[2];

    console.log(dataObj);
    if (errFlag > 0) {
        res.render('simple_crud/index', { errElement: errElement, dataObj: dataObj, isError: true });
    }

    else {
        let result = await insertStudentDetails(req.body);
        if (result) {
            res.render('simple_crud/index', { error: "", dataObj: "", isError: false });
            res.end();
        }
    }
}

const showStudentList = async (req, res) => {
    let result = await findAll('student_detail')
    if (result.length > 0) {
        res.render('simple_crud/list', { obj: result });
        res.end();
    }
}

const showStudentDetail = async (req, res) => {
    console.log(req.session.user);
    let id = req.query.id;
    console.log(id);
    let result = await findById('student_detail', 'student_id', id);
    if (result.length > 0) {
        console.log(result);
        res.render('simple_crud/details', { obj: result });
        res.end();
    }
}

const loginUser = async (req, res) => {

    let data = await validateUserLogin(req.body);
    if (data.length == 1) {
        console.log(data);
        console.log(data[0].student_id + "id :" + data[0].pass + "pass");
        const newUser = { id: data[0].student_id, pass: data[0].pass };
        req.session.user = newUser;
        console.log(req.session.user);
        req.session.save();
        res.render('simple_crud/index', { error: "", dataObj: "", isError: false });
        res.end();
    }
    else {
        res.send("user is not registered");
        res.end();
    }
}
const openUpdatePage = async (req, res) => {
    let id = req.query.id;
    console.log(req.session.user + "logged in");
    if (req.session.user.id == id) {
        let data = await findById('student_detail', 'student_id', id);
        if (data.length != 0) {
            res.render('simple_crud/update', { obj: data });
        }
    }
    else {
        res.send("you cannot update the data of other user");
    }
}

const updateUser = async (req, res) => {
    let id = req.body.id;

    let result1 = await updateUserSql(req.body);
    if (result1) {
        let result = await findById('student_detail', 'student_id', id);
        console.log(result);
        if (result.length > 0) {
            res.render('simple_crud/details', { obj: result });
            res.end();
        }
    }
}

const deleteUser = async (req, res) => {
    let id = req.query.id;
    console.log(req.session.user[id] + "loggedin");
    if (req.session.user.id == id) {
        let result1 = await deleteById('student_detail', 'student_id', id);
        if (result1) {
            console.log("data successfully deleted");
            req.session.destroy();
            res.render('simple_crud/index', { error: "", dataObj: "", isError: false });
            res.end();
        }


    }
    else {
        res.send("you cannot delete data of other user");
    }
}
module.exports = { registerUser, showStudentList, showStudentDetail, loginUser, openUpdatePage, updateUser, deleteUser };