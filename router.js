const express = require("express");

const router = express.Router();  

const Controller = require("./controller");

router.get("/prices", Controller.CurrentPrice);  

module.exports = router;  