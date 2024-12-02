const express = require("express");
const { getCategoey } = require("../controllers/categoryControl");
const router = express.Router();

router.get("/categorys", getCategoey);

module.exports = router;
