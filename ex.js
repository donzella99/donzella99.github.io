/*jshint esversion: 6 */

function getdata(){
    fetch('https://ipinfo.io/4.16.25.211?token=a8e8eac3e00672')
    .then(response => {
    return response.json();
    })

    .then(data => {
            console.log(data);
            var obj = data.city;
            console.log(obj);
            //document.getElementById("here-location").disabled = false;
            document.querySelector("h1").innerHTML = obj;
    });
}

function button_off(){
    document.addEventListener("DOMContentLoaded", function(event) {

    });
}

function keyword_result() {
    var x = document.getElementById("key").value;
    console.log(x);
}

function getData(){
    return false;
}

button_off();
getdata();
document.getElementById("search").addEventListener("click",function (){
    if(document.getElementById("keyword").value.length == 0){
        document.getElementById("msg").innerHTML = " Please fill out this field.";
    }
    else if(document.getElementById("category").value.length == 0){
        document.getElementById("msg").innerHTML = "your message";
    }
    else{
        document.getElementById("msg").innerHTML = "";
    }
});

document.getElementById("here_button").addEventListener("click",function(){

    var element = document.getElementById('here_button');
    element.dispatchEvent(event);
    var event = new Event('change', { bubbles: true });

});
