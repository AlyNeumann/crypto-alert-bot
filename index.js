
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
    //save current prices to DB
    //call DB to compare to new current prices
    //alert if exponential change
    //call whale alerts api