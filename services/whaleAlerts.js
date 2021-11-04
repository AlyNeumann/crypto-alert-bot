const axios = require("axios");
const moment = require("moment");

const WHALE_BOUGHT = 'bought';
const WHALE_TRANSFER = 'transfer';
const CURRENCY_UP = 'up';

//TODO: set up cron job for every four hours 
module.exports = async () => {
    //Checking all the tweets from the last 4 hours
    let startTime = moment().local().subtract(4, 'hours').toISOString()

    try {
        let url =
            `https://api.twitter.com/2/users/1393395686117318663/tweets?tweet.fields=created_at&expansions=author_id&user.fields=created_at&start_time=${startTime}&max_results=100`;
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
            if (alert !== undefined) {
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
    if (!tweet.text) {
        return { error: true };
    }
    let text = tweet.text.toLowerCase();
    let timeStr = tweet.created_at
    let time = moment.parseZone(timeStr).local().format('YYYY-MM-DD HH:mm:ss');

    if (text.includes(WHALE_BOUGHT)) {
        console.log('bought')
        coin = getCoinFromTweet(text)
        alert = formatBuyAlert(coin, text, time)
    }
    else if (text.includes(WHALE_TRANSFER)) {
        console.log('transfer')
        coin = getCoinFromTweet(text)
        alert = formatTransferAlert(coin, text, time)
    }
    else if (text.includes(CURRENCY_UP)) {
        console.log('up')
        coin = getCoinFromTweet(text)
        alert = formatUpAlert(coin, text, time)
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
        if (text.includes('$')) {
            coins.push(text)
        }
    })
    return coins[0]
}

const formatBuyAlert = (coin, text, time) => {
    return {
        title: `Whale bought ${coin}!`,
        text: text,
        time: time
    }
}
const formatTransferAlert = (coin, text, time) => {
    return {
        title: `Whale transferred  ${coin}!`,
        text: text,
        time: time
    }
}
const formatUpAlert = (coin, text, time) => {
    if (!coin) {
        return undefined
    }
    return {
        title: `${coin} is up!`,
        text: text,
        time: time
    }
}