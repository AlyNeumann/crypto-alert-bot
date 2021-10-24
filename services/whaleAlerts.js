const axios = require("axios");
require('dotenv').config();

const WHALE_BOUGHT = 'bought';
const WHALE_TRANSFER = 'transfer';
const CURRENCY_UP = 'up';

module.exports = async () => {
    // let apiKey = process.env.TW_API_KEY;
    try {
      let url =
        `https://api.twitter.com/2/users/1393395686117318663/tweets?tweet.fields=created_at&expansions=author_id&user.fields=created_at&max_results=20`;
      const resp = await axios.get(url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.TW_BEARER_TOKEN}`
        },
      });
      if (!resp.data) {
        return { error: true };
      }

      resp.data.data.map(tweet => {
          fitlerBought(tweet)
      })
  
    //   return resp.data.data.map(tweet => {
    //     return {
    //         createdAt: tweet.created_at,
    //         text: tweet.text
    //     };
    //   })
  
    } catch (error) {
      return { error: true };
    }
}

const fitlerBought = async (tweet) => {
    if(!tweet.text){
        return { error: true };
    }
    let text = tweet.text.toLowerCase();
    if(text.includes(WHALE_BOUGHT)){
        console.log('bought')
        getCoinFromTweet(text)
    }
    else if(text.includes(WHALE_TRANSFER)){
        console.log('transfer')
        getCoinFromTweet(text)
    }
    else if (text.includes(CURRENCY_UP)){
        console.log('up')
        getCoinFromTweet(text)
    }
    else {
        console.log('no news')
    }
   
}

//TODO: Finish Regex - not filtering properly yet
const getCoinFromTweet = (text) => {
        let coin;
        let textArr = text.split(" ")

        textArr.map(text => {
            if(text.includes("$")){
                return coin = text
            }
        })
        console.log(coin)
}