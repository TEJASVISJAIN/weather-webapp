const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
const port = 3000;
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
const apiKey = "aad6d6d424c35a26e4bf8b71190b209e";

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req,res){

  const cityName = req.body.cityName;
  https.get(baseUrl+"q="+cityName+"&appid="+ apiKey +"&units=metric", function(response){
    console.log(response.statusCode);
      
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const weatherImageIcon = weatherData.weather[0].icon;
      const imgUrl = "http://openweathermap.org/img/wn/"+weatherImageIcon+"@2x.png";
      console.log("Temperature", temp);
      console.log("Description", desc);
      
      res.write("<p>The weather currently is " + desc +"<p>");
      res.write("<h1>The temperature in "+cityName+" is " + temp + " degrees celsius<h1>");
      res.write(`<img src= ${imgUrl}>`);
      res.send();
    })
  })
})




app.listen(process.env.PORT || port, function(req,res){
  console.log("Listening on port", port);
})