const express = require("express");
const {
  login_POST,
  sginup_POST,
  logout_GET,
} = require("../controllers/authControl");
const router = express.Router();

router.post("/login", login_POST);
router.post("/signup", sginup_POST);
router.get("/logout", logout_GET);

module.exports = router;
