/*jshint esversion: 8 */
var obj = "";
var use_obj = "";
var search_obj = "";
var ticketmaster;
var curr;
var button_1;
var button_2;

document.getElementById("search").addEventListener("click",function (){
    if(document.getElementById("keyword").value.length == 0){
        document.getElementById("msg").innerHTML = " Please fill out this field.";
    }
    else if(document.getElementById("category").value.length == 0){
        document.getElementById("msg").innerHTML = "your message";
    }
    else{
        if(document.getElementById("location").value != "location" && document.getElementById("location").value != ""){
                console.log("c1");
                console.log(search_obj);
        }
        document.getElementById("msg").innerHTML = "";
        receive_events();
        receive_events();
        receive_events();
        console.log("JALAKSLA");
        console.log(search_obj);
        if(button_1 == 1){
            use_obj = obj;
        }
        else{
            use_obj = search_obj;
        }

        send_keyword();
        send_keyword();
        send_keyword();
    }
});

document.getElementById("clear").addEventListener("click",function (){
    if(document.getElementById("keyword").value.length != 0){
        document.getElementById("keyword").value = "";
        delete_ext();
        delete_row(ticketmaster);
    }
    if(document.getElementById("location").value.length != 0){
        document.getElementById("location").value = "";
    }
});

document.getElementById("here_button").addEventListener("click",function (){
    button1();
});

document.getElementById("checkbox_location").addEventListener("click",function (){
    button2();
});

function init(){
     document.getElementById("keyword").disabled = true;
     document.getElementById("location").disabled = true;
     button_1 = 1;
     button_2 = 0;
     document.getElementById("here_button").checked= true;
}

function getdata(){
    fetch('https://ipinfo.io/4.16.25.211?token=a8e8eac3e00672')
    .then(response => {
    return response.json();
    })

    .then(data => {
         //   console.log(data);
            obj = data.loc;
            console.log("LOL");
            console.log(obj);
            //document.getElementById("here-location").disabled = false;

            //document.querySelector("h1").innerHTML = obj;
            document.getElementById("keyword").disabled = false;
    });
    return 1;
}

function find_location(){
    var split_words =  document.getElementById("location").value.split(" ");
    var combined_words = "";
    console.log(split_words);
    combined_words += split_words[0];
    for(x=1; x<split_words.length; x++){
        combined_words += '+';
        combined_words += split_words[x];
    }

    var new_url = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAjU6cgR6QnwPyH5ICJAbcl7_D4NAxwJ2c&address=' + combined_words;
    console.log(new_url);
    fetch(new_url)
        .then(response => {
        return response.json();
        })

        .then(data => {
            if(typeof data != 'undefined'){
                search_obj = data.results[0].geometry.bounds.northeast.lat+ "," + data.results[0].geometry.bounds.northeast.lng;
                console.log(typeof search_obj);
                console.log(search_obj);
                document.getElementById("keyword").disabled = false;
                return 1;
            }
        });
}

function receive_events(){
    fetch("/events").then(function(value) {
        if(value.ok){
            return value.json();
        }
        else{
            return receive_events();
        }
    })
    .then(
        (value) => {
            console.log(value);
            print_events(value);
            ticketmaster = value;
        }
    );
}

function extend_event(){
    events_ticketmaster = ticketmaster;
    var table1 = document.getElementById("expand-table");
    var size = (events_ticketmaster.page.totalElements) * 215;
    console.log(size);
    document.getElementById("expand-table").style.paddingTop = 'size'+'px';
    console.log("LENGTH");
    console.log(curr);
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

function delete_ext(){
    var y = (document.getElementById("expand-table").rows.length);
        for(x = 0; x<y; x++){
            document.getElementById("expand-table").deleteRow(0);
        }
}

function add_row(events_ticketmaster){
    document.getElementById("event-table").style.display = "block";
    document.getElementById("head1").style.color = "black";
    document.getElementById("head2").style.color = "black";
    document.getElementById("head3").style.color = "black";
    document.getElementById("head4").style.color = "black";
    document.getElementById("head5").style.color = "black";
    var max = 20;
    if(events_ticketmaster.page.totalElements<20){
        max = events_ticketmaster.page.totalElements;
    }

    for(i = 1; i<=max; i++){
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
        var date = events_ticketmaster._embedded.events[curr].dates.start.localDate + " " + events_ticketmaster._embedded.events[curr].dates.start.localTime;

        cell0.innerHTML = date;
        var img = document.createElement('img');
        var images = events_ticketmaster._embedded.events[curr].images;
        for(z =0; z<images.length; z++){
            if(events_ticketmaster._embedded.events[curr].images[z].width == 305){
                img.src = events_ticketmaster._embedded.events[curr].images[z].url;
            }
        }


        cell1.appendChild(img);
        cell2.innerHTML ='<a href="#" onclick=extend_event(); return false;>'+events_ticketmaster._embedded.events[curr].name +'<\a>';
        cell3.innerHTML = events_ticketmaster._embedded.events[curr].classifications[0].segment.name;
        cell4.innerHTML = events_ticketmaster._embedded.events[curr]._embedded.venues[0].name;
        document.getElementById("event-table").style.border = "solid #000000";
    }
}

function delete_row(events_ticketmaster){
    var y = (document.getElementById("event-table").rows.length);
    document.getElementById("head1").style.color = "white";
    document.getElementById("head2").style.color = "white";
    document.getElementById("head3").style.color = "white";
    document.getElementById("head4").style.color = "white";
    document.getElementById("head5").style.color = "white";
    for(x = 1; x<y; x++){
        document.getElementById("event-table").deleteRow(1);
    }
    document.getElementById("event-table").style.border = "solid #FFFFFF";
}




function print_events(events_ticketmaster){
    console.log((document.getElementById("event-table").rows.length));
    if(events_ticketmaster.page.totalElements != 0 && document.getElementById("event-table").rows.length==2 ){
        add_row(events_ticketmaster);
        document.getElementById("no-events").innerHTML  = "";
    }
    else if((document.getElementById("event-table").rows.length)!=2 && events_ticketmaster.page.totalElements != 0){
            delete_row(events_ticketmaster);
            delete_ext();
            add_row(events_ticketmaster);
            document.getElementById("no-events").innerHTML  = "";
    }
    else{
        delete_row(events_ticketmaster);
        delete_ext();
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

function button1(){
    button_1 = 1;
    button_2 = 0;
    document.getElementById("location").disabled = true;
}
function button2(){
    button_1 = 0;
    button_2 = 1;
    document.getElementById("location").disabled = false;
}

function send_keyword() { //SEND THE JSON STRING WITH ALL THE VALUES FOR TICKETMASTER
    var radius = "";
    if(document.getElementById("radius").value == ""){
        radius = String(document.getElementById("radius").placeholder);
    }
    else{
        radius = document.getElementById("radius").value;
        console.log(radius);
    }
    var content_val = (document.getElementById("category").value);
    var category_selected;
    if(content_val == 1){
        category_selected = "";
    }
    else if(content_val == 2){
        category_selected = "KZFzniwnSyZfZ7v7nJ";
    }
    else if(content_val == 3){
        category_selected = "KZFzniwnSyZfZ7v7nE";
    }
    else if(content_val == 4){
        category_selected = "KZFzniwnSyZfZ7v7na";
    }
    else if(content_val == 5){
        category_selected = "KZFzniwnSyZfZ7v7nn";
    }
    else if(content_val == 6){
        category_selected = "KZFzniwnSyZfZ7v7n1";
    }
    (async () => {
        const rawResponse = await fetch('/test', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
        },
        body: JSON.stringify({"keyword": document.getElementById("keyword").value,"geoPoint":obj,"radius":radius, "location": document.getElementById("location").value, "category": category_selected})
    });
    const content = await rawResponse.json();

    console.log(content);
    })();
}

init();
button_off();
getdata();
