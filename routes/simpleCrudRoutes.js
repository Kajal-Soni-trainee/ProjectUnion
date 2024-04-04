const express = require("express");
const router = express.Router();
const { checkSession } = require('../middlewares/simpleCrudFunctions');
const { registerUser, showStudentList, showStudentDetail, openUpdatePage, loginUser, updateUser, deleteUser } = require('../controllers/simpleCrudController');
router.get("/simple_crud", (req, res) => {
    res.render('simple_crud/index', { error: "", dataObj: "", isError: false });
    res.end();
});

router.post('/simple_crud', registerUser);
router.get('/simple_crud_list', showStudentList);
router.get('/simple_crud_details', checkSession, showStudentDetail);
router.get("/simple_crud_login", (req, res) => {
    res.render('simple_crud/login');
    res.end();
});

router.post('/simple_crud_index', loginUser);
router.get('/simple_crud_update', checkSession, openUpdatePage);
router.post('/simple_crud_update', updateUser);
router.get('/simple_crud_delete', checkSession, deleteUser);


module.exports = router;