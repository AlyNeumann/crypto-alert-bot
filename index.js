
const express = require("express"); 

const app = express(); 

const routes = require("./router");  

const PORT = process.env.PORT || 3000; 


app.use(express.json());
app.use(routes);  

app.get("/", (req, res) => { 
  return res.json({ status: "Up and running" });
});

app.listen(PORT,              
    () => console.log("Server started listening!"));  

    //TODO:
    //take twitter feed from Whale Stats & take all the coin symbols (filter using "up", "bought", "transferred")
    //for "bought" - ALERT!
    //for "up" & "transferred" - start watching prices (use the nomics api)
    //save current prices from nomics to DB
    //call DB to compare to new current prices every few minutes
    //alert if exponential change
    
    //TODO: LATER
    //some kind of news watch - web scraper - watch for news on certain coins 