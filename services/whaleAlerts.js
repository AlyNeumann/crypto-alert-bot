const axios = require("axios");
require('dotenv').config();

const WHALE_BOUGHT = 'bought';
const WHALE_TRANSFER = 'transfer';
const CURRENCY_UP = 'up';

module.exports = async () => {

    try {
      let url =
        `https://api.twitter.com/2/users/1393395686117318663/tweets?tweet.fields=created_at&expansions=author_id&user.fields=created_at&max_results=50`;
      const resp = await axios.get(url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.TW_BEARER_TOKEN}`
        },
      });
      if (!resp.data) {
        return { error: true };
      }

    let alerts = [];
    resp.data.data.map(tweet => {
       let alert = fitlerBought(tweet)
       if(alert !== undefined){
        alerts.push(alert)
       }
    })

    return alerts;
  
    } catch (error) {
      return { error: true };
    }
}

const fitlerBought = (tweet) => {
    let coin;
    let alert;
    if(!tweet.text){
        return { error: true };
    }
    let text = tweet.text.toLowerCase();
    if(text.includes(WHALE_BOUGHT)){
       coin =  getCoinFromTweet(text)
       alert = formatBuyAlert(coin)
    }
    else if(text.includes(WHALE_TRANSFER)){
        console.log('transfer')
        coin = getCoinFromTweet(text)
        alert = formatTransferAlert(coin)
    }
    else if (text.includes(CURRENCY_UP)){
        console.log('up')
        coin = getCoinFromTweet(text)
        alert = formatUpAlert(coin)
    }
    else {
        console.log('no news')
    }
    return alert
}

const getCoinFromTweet = (text) => {
        let coins = [];
        let textArr = text.split(" ")

        textArr.map(text => {
            if(text.includes('$')){
            coins.push(text)
            }
        })
        return coins[0]
}

const formatBuyAlert = (coin) => {
    return `Whale bought ${coin}!`
}
const formatTransferAlert = (coin) => {
    return `Whale transferred ${coin}!`
}
const formatUpAlert = (coin) => {
    if(!coin){
        return undefined
    }
    return `${coin} is up!`
}