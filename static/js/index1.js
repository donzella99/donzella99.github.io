/*jshint esversion: 8 */
var obj;
var ticketmaster;
var curr;

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
            obj = data.loc;
            console.log(obj);
            //document.getElementById("here-location").disabled = false;

            //document.querySelector("h1").innerHTML = obj;
            document.getElementById("keyword").disabled = false;
    });
    return 1;
}




function receive_events(){
    fetch("/events").then(function(value) {
    return value.json();
    })
    .then(
        (value) => {
        //    console.log(value);
            print_events(value);
            ticketmaster = value;
        }
    );
}

function extend_event(){
    var table1 = document.getElementById("expand-table");
    var row = table1.insertRow(0);
    var cell1 = row.insertCell(0);
    cell1.innerHTML = '<h1>' + events_ticketmaster._embedded.events[curr].name + '</h1>';


    row = table1.insertRow(1);
    var cell2 = row.insertCell(0);
    var date = '<h1>' + 'Date' + '</h1>' + '<p2>' + events_ticketmaster._embedded.events[curr].dates.start.localDate + " " + events_ticketmaster._embedded.events[0].dates.start.localTime + '</p2></br>';

    var artist1 = events_ticketmaster._embedded.events[curr]._embedded.attractions[1].name;
    var artist1_url = events_ticketmaster._embedded.events[curr]._embedded.attractions[1].url;
    // var artist2 =
    // var artist2_url
    var artist = '<h1>' + 'Artist/Team' + '</h1>' + '<p2><a href = ' + artist1_url + '>' + artist1 + '</a></p2>';

    var venue = '<h1>' + 'Venue' + '</h1>' + '<p2> '+ events_ticketmaster._embedded.events[curr]._embedded.venues[0].name +'</p2>';

    var segment = events_ticketmaster._embedded.events[curr].classifications[0].segment.name;
    var gen = events_ticketmaster._embedded.events[curr].classifications[0].genre.name;
    var subgen = events_ticketmaster._embedded.events[curr].classifications[0].subGenre.name;
    var type = events_ticketmaster._embedded.events[curr].classifications[0].type.name;
    var subType = events_ticketmaster._embedded.events[curr].classifications[0].subType.name;
    var genres = '<h1>' + 'Genre' + '</h1>' + '<p2> '+ segment + ' |'+'</p2>' + '<p2> '+ gen + ' |' +'</p2>' + '<p2> '+ subgen + ' |' +'</p2>' + '<p2> '+ type + ' |' +'</p2>' + '<p2> '+ subType + ' |' +'</p2>';

    var status = '<h1>' + 'Ticket Status' + '</h1>' + '<p2> '+ events_ticketmaster._embedded.events[0].dates.status.code +'</p2>';

    var ticket_url = events_ticketmaster._embedded.events[curr].url;
    var buy = '<h1>' + 'Buy Ticket At' + '</h1>' + '<p2><a href= ' + artist1_url + '> '+ 'Ticketmaster' +'</a></p2>';

    var b = date + artist + genres + status + buy;
    cell2.innerHTML = b;
    var cell3 = row.insertCell(1);
    var img = document.createElement('img');
    img.src = events_ticketmaster._embedded.events[curr].seatmap.staticUrl;
    cell3.appendChild(img);
}

function add_row(events_ticketmaster){

    for(i = 1; i<=events_ticketmaster.page.totalElements; i++){
        curr = i-1;
        var table1 = document.getElementById("event-table");
        var row = table1.insertRow(i);
        row.style.border = "solid #000000";
        //console.log(i);
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);
        var cell4 = row.insertCell(4);

        cell0.style.border = "solid #000000";
        cell0.style.width = "100px";
        cell1.style.border = "solid #000000";
        cell2.style.border = "solid #000000";
        cell3.style.border = "solid #000000";
        cell4.style.border = "solid #000000";
        var date = events_ticketmaster._embedded.events[i-1].dates.start.localDate + " " + events_ticketmaster._embedded.events[i-1].dates.start.localTime;

        cell0.innerHTML = date;
        var img = document.createElement('img');
        var images = events_ticketmaster._embedded.events[i-1].images;
        for(z =0; z<images.length; z++){
            if(events_ticketmaster._embedded.events[i-1].images[z].width == 305){
                img.src = events_ticketmaster._embedded.events[i-1].images[z].url;
            }
        }


        cell1.appendChild(img);
        cell2.innerHTML =events_ticketmaster._embedded.events[i-1].name;
        cell3.innerHTML = '<p2><a src=getdata()>' + events_ticketmaster._embedded.events[i-1].classifications[0].segment.name+ '</a><p2>';
        cell4.innerHTML = events_ticketmaster._embedded.events[i-1]._embedded.venues[0].name;
    }
    document.getElementById("event-table").style.border = "solid #000000";
}

function delete_row(events_ticketmaster){
    var y = (document.getElementById("event-table").rows.length);
    for(x = 1; x<y; x++){
    //    console.log(x);
        document.getElementById("event-table").deleteRow(1);
    }
}

function print_events(events_ticketmaster){
    console.log((document.getElementById("event-table").rows.length));
    if(events_ticketmaster.page.totalElements != 0 && document.getElementById("event-table").rows.length==2 ){
        add_row(events_ticketmaster);
        document.getElementById("no-events").innerHTML  = "";
        //extend_event(events_ticketmaster);
    }
    else if((document.getElementById("event-table").rows.length)!=2 && events_ticketmaster.page.totalElements != 0){
            delete_row(events_ticketmaster);
            add_row(events_ticketmaster);
            document.getElementById("no-events").innerHTML  = "";
    }
    else{
        delete_row(events_ticketmaster);
        document.getElementById("no-events").innerHTML  = "No Events Found! Please Enter Another Search Keyword";
    }
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
        body: JSON.stringify({"keyword": document.getElementById("keyword").value,"geoPoint":obj,"radius":document.getElementById("radius").value})
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
        delete_row(ticketmaster);
    }
    if(document.getElementById("location").value.length != 0){
        document.getElementById("location").value = "";
    }
});


console.log(obj);


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
