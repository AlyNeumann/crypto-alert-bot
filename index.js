
const express = require("express"); 

const app = express();  

const PORT = process.env.PORT || 3000; 
app.use(express.json());

app.get("/", (req, res) => { 
  return res.json({ status: "Up and running" });
});

app.listen(PORT,              
    () => console.log("Server started listening!"));  