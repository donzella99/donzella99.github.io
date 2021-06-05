/*jshint esversion: 8 */

    const express = require("express");

    const app = express();

    const https = require("https");

    app.get("/",function(req,res){
        const url = "https://ipinfo.io/4.16.25.211?token=a8e8eac3e00672";
        https.get(url,function(response){
            console.log(response);

            response.on("data",function(data){
                const weatherData = JSON.parse(data);
                const temp = weatherData.city;
                console.log(temp);
                console.log(typeof temp);
            });
            const x = JSON.parse;
        });
res.send("HELLO BUDDY");
    });
    app.listen(3000, function(){
        console.log("Server Running on Port 3000");
    });
