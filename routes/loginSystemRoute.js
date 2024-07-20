const express = require("express");
const router = express.Router();
const {
  openLoginSystem,
  registerUser,
  openPasswordPage,
  createPassword,
  openLoginPage,
  loginUser,
  checkdb,
  forgetPass,
  displayList,
  openHomePage,
  logoutUser,
} = require("../controllers/controllerLoginSystem");
router.get("/", openLoginSystem);
router.post("/action", registerUser);
router.get("/pass", openPasswordPage);
router.post("/pass", createPassword);
router.get("/login", openLoginPage);
router.post("/login", loginUser);
router.get("/checkdb", checkdb);
router.get("/forget_pass", forgetPass);
router.get("/list", displayList);
router.get("/home", openHomePage);
router.get("/logout", logoutUser);

module.exports = router;
