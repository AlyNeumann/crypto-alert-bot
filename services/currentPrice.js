const axios = require("axios");
require('dotenv').config()
//This one is for setting thresholds for buying & selling

module.exports = async () => {
  let apiKey = process.env.API_KEY;
  try {
    let url =
      `https://api.nomics.com/v1/currencies/ticker?key=${apiKey}&ids=BTC,ETH,LTC,SHIB,HBAR,XLM,MANA,NANO,ADA&interval=1h,30d&convert=CAD&per-page=100&page=1`;
    const resp = await axios.get(url);
    if (!resp.data) {
      return { error: true };
    }

    return resp.data.map(crypto => {
      return {
          id: crypto.id,
          price: crypto.price
      };
    })

  } catch (error) {
    return { error: true };
  }
};