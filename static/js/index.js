/*jshint esversion: 6 */

function init(){
     document.getElementById("keyword").disabled = true;
}

function getdata(){
    fetch('https://ipinfo.io/4.16.25.211?token=a8e8eac3e00672')
    .then(response => {
    return response.json();
    })

    .then(data => {
         //   console.log(data);
            var obj = data.city;
          //  console.log(obj);
            //document.getElementById("here-location").disabled = false;
            document.querySelector("h1").innerHTML = obj;
            document.getElementById("keyword").disabled = false;
    });
}

function button_off(){
    document.addEventListener("DOMContentLoaded", function(event) {

    });
}

function keyword_result() {
    var x = document.getElementById("key").value;
 //   console.log(x);
}

function getData(){
    return false;
}

function load_generic_headlines() {
    fetch("/generic/")
        .then(function(response) {
   //               console.log(response);
                    console.log("eeeeee");
                    return;
            });
}

init();
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
        //document.getElementById("keyword").value =
    }
});

document.getElementById("clear").addEventListener("click",function (){
    if(document.getElementById("keyword").value.length != 0){
        document.getElementById("keyword").value = "";
    }
    if(document.getElementById("location").value.length != 0){
        document.getElementById("location").value = "";
    }
});


// document.getElementById("here_button").addEventListener("click",function(){
//     console.log("5");
//     document.getElementById("here_button").click();
//     if(document.getElementById("here_button").click()){
//         console.log("1");
//         if(document.getElementById("checkbox_location").click()){
//             console.log("2");
//             document.getElementById("checkbox_location").click();
//             console.log("3");
//         }
//     }
// });

// function checkbox1(){
//     document.getElementById("here_button").click();
//
// }
//
// function checkbox2(){
//     document.getElementById("checkbox_location").click();
//     //document.getElementById("here_button").disabled = true;
// }
