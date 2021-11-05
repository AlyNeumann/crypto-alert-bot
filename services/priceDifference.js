const axios = require("axios");
const CoinGecko = require("coingecko-api");
const coinPricesData = require("../data-access/coinPrices");
//This one compares last prices (from db) to current prices & check for exponential growth
//TODO: IF exponential growth is detected in first comparison (12 hour to start), do 24 hour and 7 day calculations to show in alert

module.exports = async () => {
  let currentCoins = await getCurrentCoins();

  try {
    let coinsFound = await getCoinPrices(currentCoins);
    coinsFound = coinsFound.flat();

    const coins = await formatCoins(coinsFound);

    //TODO:Save to DB here - call data access layer - set up batches
    const coinsSaved = await coinPricesData.saveCurrentPrices(coins);
    console.log(coinsSaved)
    return coins

  } catch (error) {
    console.log(error)
    return { error: true };
  }
};

const getCoinPrices = async (currentCoins) => {
  //this needs to be wrapped in setInterval - rate limits only allow one call per second
  let apiKey = process.env.API_KEY;
  let coinsFound = [];

  let i, j, coinChunk, chunk = 100;
  for (i = 0, j = currentCoins.length; i < j; i += chunk) {
    console.log('loop ' + i)
    coinChunk = currentCoins.slice(i, i + chunk)
    let url = `https://api.nomics.com/v1/currencies/ticker?key=${apiKey}&ids=${coinChunk}&interval=1h,30d&convert=CAD&per-page=100&page=1`;
    const resp = await axios.get(encodeURI(url));
    await sleep();
    coinsFound.push(resp.data)
  };

  return coinsFound;
}

const getCurrentCoins = async () => {
  const CoinGeckoClient = new CoinGecko();
  let currentCoins = [];

  let data = await CoinGeckoClient.coins.list();
  if (!data.data) {
    return { error: true };
  }
  data.data.map(coin => {
    let coinSymbol = coin.symbol;
    let coinCaps = coinSymbol.replace(/"([^"]+(?="))"/g, '$1').toUpperCase();
    return currentCoins.push(coinCaps)
  })

  return currentCoins;

}

const formatCoins = async (coins) => {
  let coinArr = [];
  coins.map(coin => {
    coinArr.push({ currency: coin.symbol, price: coin.price })
  })
  return coinArr;
}

const sleep = () => {
  return new Promise(resolve => setTimeout(resolve, 1500));
}