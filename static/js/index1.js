/*jshint esversion: 8 */

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
            //console.log(obj);
            //document.getElementById("here-location").disabled = false;

            document.querySelector("h1").innerHTML = obj;
            document.getElementById("keyword").disabled = false;
    });
}




function receive_events(){
    fetch("/events").then(function(value) {
    return value.json();
    })
    .then(
        (value) => {
            print_events(value._embedded);
        }
    );
}
//geeks for geeks for table additions
function print_events(events_ticketmaster){
    if(document.getElementById("event-table").rows.length > 1){

        var table = document.getElementById("event-table");
        for(i = 1; i<(events_ticketmaster.events.length-3); i++){
            table.deleteRow(i+1);
        }

    }
    console.log(document.getElementById("event-table").rows.length);
    for(i = 0; i<(events_ticketmaster.events.length-1); i++){
        var table1 = document.getElementById("event-table");
        var row = table1.insertRow(i+1);
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);
        var cell4 = row.insertCell(4);

        var date = events_ticketmaster.events[i].dates.start.localDate + " " + events_ticketmaster.events[i].dates.start.localTime;

        cell0.innerHTML = date;
        var img = document.createElement('img');
        img.src = events_ticketmaster.events[i].images[8].url;
	    cell1.appendChild(img);
        cell1.width = "10px";
        cell2.innerHTML = events_ticketmaster.events[i].name;
        cell3.innerHTML = events_ticketmaster.events[i].classifications[0].segment.name;
        cell4.innerHTML = events_ticketmaster.events[i]._embedded.venues[0].name;


    }
    return("x");
}

function button_off(){
    document.addEventListener("DOMContentLoaded", function(event) {

    });
}

function keyword_result() {
    var result = document.getElementById("key").value;

}

function getData(){
    return false;
}

function send_keyword() {
    (async () => {
        const rawResponse = await fetch('/test', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
        },
        body: JSON.stringify({keyword: document.getElementById("keyword").value})
    });
    const content = await rawResponse.json();

    console.log(content);
    })();
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
        send_keyword();
        receive_events();
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
