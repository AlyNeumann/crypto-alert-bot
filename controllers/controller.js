const currentPrice = require("../services/currentPrice");
const priceDifference = require("../services/priceDifference")
const whaleAlerts = require("../services/whaleAlerts");
const { errorObject } = require("../config");
const cryptoTypes = require("../models/cryptoTypes");
const alerts = require("../services/alerts");

exports.CurrentPrice = async (req, res) => {
    try {
      let prices = await currentPrice();
      if (prices.error) return res.status(500).json(errorObject);
      return res.status(200).json(prices);
    } catch (error) {
       return res.status(500).json(errorObject);
    }
  };

  exports.NewAlert = async (req, res) => {
    try {
      const { asset, price, email, type } = req.body;
      if (!asset || !price || !email || !type)
        return res.status(400).json({
          error: true,
          message: "Please provide the asset and price",
        });
  
        if (!cryptoTypes.includes(asset.toUpperCase()))
            return res.status(400).json({
                error: true,
                message: "We do not provide an alert for this coin yet",
            });

        //TODO: Store these in DB - Data Access Layer!
  
      alerts.push({
        asset: asset,
        price: price,
        email: email,
        type: type.toLowerCase(),
        createdAt: new Date(),
      });
      return res.send({ success: true, message: "Alert created" });
    } catch (error) {
      console.error("Create alert error", error);
      return res.status(500).json(errorObject);
    }
  };
  
  exports.GetAlerts = async (req, res) => {
    try {
      return res.send({ success: true, alerts: alerts });
    } catch (error) {
      console.error("Get alert error", error);
      return res.status(500).json(errorObject);
    }
  };

  exports.PriceDifference = async (req, res) => {
    try {
      let prices = await priceDifference();
      if (prices.error) return res.status(500).json(errorObject);
      console.log(prices)
      return res.status(200).json(prices);
    } catch (error) {
       return res.status(500).json(errorObject);
    }
  }

  exports.GetWhales = async (req, res) => {
    try {
      let whales = await whaleAlerts();
      console.log(whales)
    }
    catch (error) {
      return res.status(500).json(errorObject);
    }
  }