/*jshint esversion: 8 */

const express = require("express");
const app = express();
const https = require("https");
// const hostname = '127.0.0.1';
const port = '8080';
const fetch = require("node-fetch");
const path = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=qcOhKgPQynndjc1pcDNq0flHYCg2ltMF";
 const axios = require('axios');

 // axios.defaults.baseURL = "http://localhost:3000/";

var bodyParser = require('body-parser');
var finalData;

// var client_id = 'CLIENT_ID'; // Your client id
// var client_secret = 'CLIENT_SECRET'; // Your secret
// var redirect_uri = 'REDIRECT_URI'; // Your redirect uri

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static(__dirname + "/"));

// var dz = [{"Robert" : "Big Baller"}];
dz = "notready";



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
          res.send("error");
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

// async function check() {
//     try {
//         let scheduleArr = await axios.get('https://accounts.spotify.com/api/token');
//         dz =(scheduleArr.data);
//         dz = JSON.stringify(dz);
//         console.log("SPotiy");
//         console.log(dz);
//         }
//         catch (err) {
//           console.log(`ERROR: ${err}`);
//         }
//   }
//
//   check();

app.listen(port,function(){
    console.log("server started");
});

// app.get("/spotify", function (request, response) {
//   let query = request.query.query;
//
//   console.log(request);
//
//   if(request.query.context) {
//     if(request.query.context == 'artist') {
//       query = 'artist:' + request.query.query;
//     }
//     if(request.query.context == 'track') {
//       query = 'track:' + request.query.query;
//     }
//   }
//   spotifyApi.searchTracks(query)
//   .then(function(data) {
//     console.log(data.body);
//     response.send(data.body);
//   }, function(err) {
//     console.log(err)
// //   });
// });


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
