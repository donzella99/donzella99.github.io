/*jshint esversion: 8 */

const express = require("express");
const app = express();
const https = require("https");
const hostname = '127.0.0.1';
const port = '3000';
const fetch = require("node-fetch");
const path = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=qcOhKgPQynndjc1pcDNq0flHYCg2ltMF";
 const axios = require('axios');
 // axios.defaults.baseURL = "http://localhost:3000/";

var bodyParser = require('body-parser');
var finalData;

var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static(__dirname + "/"));

// var dz = [{"Robert" : "Big Baller"}];
dz = "notready";

// function ticketmaster() {
//     fetch(path)
//     // .then(response => {
//     // return response.json();
//     // })
//     .then(data => {
//             var obj = data.loc;
//             console.log(obj);
//             return obj;
//     })
//     .catch((error) => {
//         console.log(error);
//     });
//     return 1;
// }

async function getSchedule(res) {
    try {
        var thing = path + "&keyword=" + finalData.Keyword + "&sort=date,asc"+"&geoPoint="  + finalData.geoPoint + "&radius=" + finalData.Radius + "&SegmentId=" + finalData.Category;
        console.log(thing);
        let scheduleArr = await axios.get(path + "&keyword=" + finalData.Keyword +"&sort=date,asc&geoPoint=" + finalData.geoPoint + "&radius=" + finalData.Radius + "&SegmentId=" + finalData.Category);
        dz =(scheduleArr.data);
        dz = JSON.stringify(dz);
        //console.log(dz);
        res.send(dz);
        }
        catch (err) {
          console.log(`ERROR: ${err}`);
        }
  }

app.get("/search", function(req,res){
    // var obj = {};
    finalData = (req.query);
    console.log(finalData);
    try{
        getSchedule(res);
    }
    catch(err){
        console.log("error");
    }
    // console.log(finalData.Keyword);
});

app.listen(port,function(){
    console.log("server started");
});



//axios
//module.exports=app;

// function getdata(){
//     fetch('https://ipinfo.io/4.16.25.211?token=a8e8eac3e00672')
//     .then(response => {
//     return response.json();
//     })
//
//     .then(data => {
//          //   console.log(data);
//             obj = data.loc;
//             //document.getElementById("here-location").disabled = false;
//
//             //document.querySelector("h1").innerHTML = obj;
//             document.getElementById("keyword").disabled = false;
//     });
//     return 1;
// }
