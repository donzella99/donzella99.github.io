/*jshint esversion: 8 */

const express = require("express");
const app = express();
const https = require("https");
const hostname = '127.0.0.1';
const port = '3000';
const fetch = require("node-fetch");
const path = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=qcOhKgPQynndjc1pcDNq0flHYCg2ltMF";
const axios = require('axios');

// var bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded());
// app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(express.static(__dirname + "/"));

var dz = [{"Roberto" : "Big Baller"}];

function makeGetRequest(path) {
    axios.get(path).then(
        (response) => {
            var result = response.data;
            console.log(result);
        },
        (error) => {
            console.log(error);
        }
    );
}
makeGetRequest('http://127.0.0.1:5000/test');

app.get("/search", function(req,res){
    var obj = {};
	console.log("hello");
	res.send(dz);
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
