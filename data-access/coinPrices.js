//Get last coin prices in DB if exists (wont for the first time)
//Call price difference service for new coin prices - save new prices with date
//TODO: Connection but need to test with env file - not working 
const mongoose = require('mongoose');
require('dotenv').config()
const CoinPrice = require("../models/coin-prices")

let connectionString = process.env.CONNECTION_STRING

let client = mongoose.connect(connectionString,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

function isConnected() {
    console.log('connected')
    console.log(connectionString)
    return !!client && !!client.topology && client.topology.isConnected()
}

isConnected();

//saving multiple prices at once - look into batching 
module.exports.saveCurrentPrices = async (resp) => {
    console.log(resp)
    // try {
    //     let result = await coin.save()
    //     return res.status(200).json(result)
    // }
    // catch (error) {
    //     return res.status(500).json(errorObject)
    // }

}