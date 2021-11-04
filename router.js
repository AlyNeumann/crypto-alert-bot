const express = require("express");

const router = express.Router();  

const Controller = require("./controllers/controller");

router.get("/prices", Controller.CurrentPrice);  
router.get("/alerts", Controller.GetAlerts);
router.post("/alert", Controller.NewAlert);
router.get("/price-changes", Controller.PriceDifference);
router.get("/whales", Controller.GetWhales);
// router.get("/add-coin", Controller.AddCoin);

module.exports = router;  