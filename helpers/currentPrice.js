const axios = require("axios");

module.exports = async () => {
  try {
    let url =
    `https://api.nomics.com/v1/currencies/ticker?key=aa942a9f1059d52609331ca20feae8385afce67f&ids=BTC,ETH&interval=1d,30d&convert=EUR&per-page=100&page=1`;
    const resp = await axios.get(url);
    return {
      error: false,
      data: { BTC: resp.data[0].price, ETH: resp.data[1].price },
    };
  } catch (error) {
     return { error: true };
  }
};