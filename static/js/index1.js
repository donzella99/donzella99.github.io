/*jshint esversion: 8 */
var obj = "";
var use_obj = "";
var search_obj = "";
var ticketmaster;
var curr;
var button_1;
var button_2;
var call_extend;

document.getElementById("search").addEventListener("click",function (){
    if(document.getElementById("keyword").value.length == 0){
        document.getElementById('tt1').innerHTML = "Please Enter a Keyword ^";
        document.getElementById('tt2').innerHTML = "";
        document.getElementById('tt3').innerHTML = "";
    }
    else if(document.getElementById("location").value.length == 0 && button_2 == 1){
    //    document.getElementById("tt2").classList.opacity = "0";
        document.getElementById('tt1').innerHTML = "";
        document.getElementById('tt2').innerHTML = "";
        document.getElementById('tt3').innerHTML = "Please Enter a Location";
    }
    else if(isNaN(document.getElementById('radius-key').value)){
        document.getElementById('tt2').innerHTML = "Needs to be a Number^";
        document.getElementById('tt3').innerHTML = "";
        document.getElementById('tt1').innerHTML = "";
    }
    else{
        if(document.getElementById("location").value != "location" && document.getElementById("location").value != ""){
                console.log("c1");
                console.log(search_obj);
        }
        document.getElementById('tt1').innerHTML = "";
        document.getElementById('tt2').innerHTML = "";
        document.getElementById('tt3').innerHTML = "";
        receive_events();
        console.log("JALAKSLA");
        console.log(search_obj);
        if(button_1 == 1){
            use_obj = obj;
        }
        else{
            use_obj = document.getElementById('location').value;
        }
        send_keyword();
    }
});

document.getElementById("clear").addEventListener("click",function (){
    if(document.getElementById("keyword").value.length != 0){
        document.getElementById('tt1').innerHTML = "";
        document.getElementById('tt2').innerHTML = "";
        document.getElementById('tt3').innerHTML = "";
        document.getElementById("keyword").value = '';
        button1();
        document.getElementById("here_button").checked= true;
        document.getElementById("checkbox_location").checked= false;
        delete_ext();
        delete_row(ticketmaster);
    //    document.getElementById("msg").innerHTML = '';
        document.getElementById("keyword").value = '';
        document.getElementById("radius-key").innerHTML = '';
        document.getElementById("radius-key").value = '';
        document.getElementById("category").selectedIndex = "Default";
        call_extend = 0;
        window.location='../#';

    }
    else{
        button1();
        document.getElementById('tt1').innerHTML = "";
        document.getElementById('tt2').innerHTML = "";
        document.getElementById('tt3').innerHTML = "";
        document.getElementById("here_button").checked= true;
        document.getElementById("checkbox_location").checked= false;
    //    document.getElementById("msg").innerHTML = '';
        document.getElementById("keyword").value = '';
        document.getElementById("radius-key").innerHTML = '';
        document.getElementById("radius-key").value = '';
        document.getElementById("category").selectedIndex = "Default";
        call_extend = 0;
    }
    if(document.getElementById("location").value.length != 0){
        document.getElementById("location").innerHTML = "";
        document.getElementById("radius-key").value = '';
    }
});

document.getElementById("here_button").addEventListener("click",function (){
    button1();
});

document.getElementById("checkbox_location").addEventListener("click",function (){
    button2();
});

function init(){
    call_extend = 0;
     document.getElementById("keyword").disabled = true;
     document.getElementById("location").disabled = true;
     button_1 = 1;
     button_2 = 0;
     document.getElementById("here_button").checked= true;
     use_obj = obj;
     document.getElementById("head1").style.color = "white";
     document.getElementById("head2").style.color = "white";
     document.getElementById("head3").style.color = "white";
     document.getElementById("head4").style.color = "white";
     document.getElementById("head5").style.color = "white";
}

function getdata(){
    fetch('https://ipinfo.io/4.16.25.211?token=a8e8eac3e00672')
    .then(response => {
    return response.json();
    })

    .then(data => {
         //   console.log(data);
            obj = data.loc;
            //document.getElementById("here-location").disabled = false;

            //document.querySelector("h1").innerHTML = obj;
            document.getElementById("keyword").disabled = false;
    });
    return 1;
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

function extend_event(i){
    if(call_extend == 1){
        delete_ext();
    }
    curr = i-1;
    call_extend = 1;
    events_ticketmaster = ticketmaster;
    var table1 = document.getElementById("expand-table");
    console.log("HA");
    console.log(events_ticketmaster.page.totalElements);
    var number = ticketmaster.page.totalElements;
    if(ticketmaster.page.totalElements >20){
        number = 20;
    }
    var x = (parseInt("235px".replace(/px/,""))*number)+"px";
    console.log(x);
    table1.style.paddingTop  = x;
    console.log(i);
    var row = table1.insertRow(0);
    var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    cell1.innerHTML = '<h1>' + events_ticketmaster._embedded.events[curr].name + '</h1>';


    var row1 = table1.insertRow(1);
    row1.id = 'expansion-table';
    var cell2 = row1.insertCell(0);

    var date = "";
    var artist1= "";
    var artist1_url= "";
    var artist= '<h1>' + 'Artist/Team' + '</h1>';
    var venue= "";
    var segment= "";
    var gen= "";
    var subgen= "";
    var type= "";
    var subType= "";
    var genres= '<h1>' + 'Genres' + '</h1>';
    var status= "";
    var ticket_url= "";
    var price = "";
    var buy= "";

    if(events_ticketmaster._embedded.events[curr].dates.start.hasOwnProperty('localDate')){
        date = '<h1>' + 'Date' + '</h1>' + '<p2>' + events_ticketmaster._embedded.events[curr].dates.start.localDate + " " + events_ticketmaster._embedded.events[0].dates.start.localTime + '</p2></br>';
    }
    if(events_ticketmaster._embedded.events[curr]._embedded.attractions[0].hasOwnProperty('name')){
        for(x = 0; x<events_ticketmaster._embedded.events[curr]._embedded.attractions.length; x++){
            artist1 = events_ticketmaster._embedded.events[curr]._embedded.attractions[x].name;
            artist1_url = events_ticketmaster._embedded.events[curr]._embedded.attractions[x].url;
            if(x!=0){
                artist += ' | ';
            }
            artist += '<p2><a href = ' + artist1_url + '>' + artist1 + '</a>' + '</p2>';
        }
    }
    if(events_ticketmaster._embedded.events[curr]._embedded.venues[0].hasOwnProperty('name')){
        venue = '<h1>' + 'Venue' + '</h1>' + '<p2> '+ events_ticketmaster._embedded.events[curr]._embedded.venues[0].name +'</p2>';
        console.log(venue);
    }
    if(events_ticketmaster._embedded.events[curr].classifications[0].segment.hasOwnProperty('name')){
        segment = events_ticketmaster._embedded.events[curr].classifications[0].segment.name;
        if(segment != 'Undefined'){
            genres += '<p2> '+ segment + ' |' +'</p2>';
        }
    }
    if(events_ticketmaster._embedded.events[curr].classifications[0].genre.hasOwnProperty('name')){
         gen = events_ticketmaster._embedded.events[curr].classifications[0].genre.name;
         if(gen != 'Undefined'){
             genres += '<p2> '+ gen + ' |' +'</p2>';
         }
    }
    if(events_ticketmaster._embedded.events[curr].classifications[0].subGenre.hasOwnProperty('name')){
        subgen = events_ticketmaster._embedded.events[curr].classifications[0].subGenre.name;
        if(subgen != 'Undefined'){
            genres += '<p2> '+ subgen + ' |' +'</p2>';
        }
    }
    if(events_ticketmaster._embedded.events[curr].classifications[0].type.hasOwnProperty('name')){
        type = events_ticketmaster._embedded.events[curr].classifications[0].type.name;
        if(type != 'Undefined'){
            genres += '<p2> '+ type + ' |' +'</p2>';
        }
    }
    if(events_ticketmaster._embedded.events[curr].classifications[0].subType.hasOwnProperty('name')){
        subType = events_ticketmaster._embedded.events[curr].classifications[0].subType.name;
        if(subType != 'Undefined'){
            genres += '<p2> '+ subType +'</p2>';
        }
    }
    if(events_ticketmaster._embedded.events[0].dates.status.hasOwnProperty('code')){
        status = '<h1>' + 'Ticket Status' + '</h1>' + '<p2> '+ events_ticketmaster._embedded.events[0].dates.status.code +'</p2>';
    }
    console.log("check");
    if(events_ticketmaster._embedded.events[0].hasOwnProperty('priceRanges')){
        price = '<h1>' + 'Price Ranges ' + '</h1>' + '<p2> '+ events_ticketmaster._embedded.events[0].priceRanges[0].min + ' - '+ events_ticketmaster._embedded.events[0].priceRanges[0].max + ' USD' +'</p2>';
        console.log("LOL");
    }
    if(events_ticketmaster._embedded.events[curr].hasOwnProperty('url')){
        ticket_url = events_ticketmaster._embedded.events[curr].url;
        buy = '<h1>' + 'Buy Ticket At' + '</h1>' + '<p2><a href= ' + ticket_url + '> '+ 'Ticketmaster' +'</a></p2>';
    }

    var b = date + artist + venue + genres + price + status + buy;
    cell2.innerHTML = b;
    if(events_ticketmaster._embedded.events[curr].hasOwnProperty('seatmap')){
        var cell3 = row1.insertCell(1);
        var img = document.createElement('img');
        img.src = events_ticketmaster._embedded.events[curr].seatmap.staticUrl;
        cell3.appendChild(img);
    }
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
        cell2.innerHTML ='<a href="#expansion-table" onclick=extend_event('+ i + '); return= false;>'+events_ticketmaster._embedded.events[curr].name +'<\a>';
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
    use_obj = obj;
    document.getElementById('location').value = '';
    document.getElementById("location").disabled = true;
}
function button2(){
    button_1 = 0;
    button_2 = 1;
    use_obj = document.getElementById('location').value;
    document.getElementById("location").disabled = false;
}

function send_keyword() { //SEND THE JSON STRING WITH ALL THE VALUES FOR TICKETMASTER
    var radius = "";
    if(document.getElementById("radius-key").value == ""){
        radius = String(document.getElementById("radius-key").placeholder);
    }
    else{
        radius = document.getElementById("radius-key").value;
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
        body: JSON.stringify({"keyword": document.getElementById("keyword").value,"geoPoint":obj,"radius":radius, "location": use_obj, "category": category_selected})
    });
    const content = await rawResponse.json();

    console.log(content);
    })();
}

init();
button_off();
getdata();
