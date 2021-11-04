const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coinSchema = new Schema({
    currency: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        require: true
    }
}, { timestamps: true })

const CoinPrice = mongoose.model('Coin-Price', coinSchema);

module.exports = CoinPrice;