/*jshint esversion: 8 */
// Div #
// h1."class"
//$(document).ready(function() {

var button_1;
var button_2;
var dz = [{"Roberto" : "Big Baller"}];
var universal;
var count = 0;
var click =0;
const apiHost = "http://localhost:3000";
var events_ticketmaster;

function createRowColumn(row) {
    var column = document.createElement("td");
    row.appendChild(column);
    return column;
}

function delete_rows(){
    var y = (20);
    $('tr').addClass('hide-table');
    for(x = 1; x<=y; x++){
        document.getElementById("table").deleteRow(1);
    }
}

function event_details(){
    delete_rows();
}

function add_favorites(){
//
}



function add_event() {
    console.log("J");
    $('#nav-1').removeClass("he");
    $('#nav-2').addClass("he");
    $('#nav-3').addClass("he");
    var max = 20;
    if(events_ticketmaster.page.totalElements<20){
        max = events_ticketmaster.page.totalElements;
    }
    for(i = 0; i<max; i++){
        var newrow = document.createElement("tr");
        var number = createRowColumn(newrow);
        var date = createRowColumn(newrow);
        var event_name = createRowColumn(newrow);
        var category = createRowColumn(newrow);
        var venue_info = createRowColumn(newrow);
        var favorite = createRowColumn(newrow);
        // console.log("here");
        // console.log(universal['0']._embedded);
        count= i+1;
        number.innerHTML = count;
        date.innerHTML = events_ticketmaster._embedded.events[i].dates.start.localDate;
        event_name.innerHTML = '<a href="#expansion-table" onclick=event_details('+ i + '); return= false;> ' + events_ticketmaster._embedded.events[i].name + ' </a>' ;
        var cat = events_ticketmaster._embedded.events[i].classifications[0].segment.name + ' | ' + events_ticketmaster._embedded.events[i].classifications[0].genre.name + ' | '+  events_ticketmaster._embedded.events[i].classifications[0].subGenre.name;
        category.innerHTML = cat;
        venue_info.innerHTML = events_ticketmaster._embedded.events[i]._embedded.venues[0].name;
        var checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        favorite.appendChild(checkbox);

        var table = document.getElementById('table');
        var tbody = table.querySelector('tbody');
        tbody.appendChild(newrow);
    }
}

$('#results').click(function(){
    $('#favorites').addClass("btn-change");
    $('#results').removeClass("btn-change");
});

$('#favorites').click(function(){
    $('#results').addClass("btn-change");
    $('#favorites').removeClass("btn-change");
});

$('#search').click(function(){
    if($('#keyword').val().length == 0){
        $('#keyword').addClass("is-invalid");
    }
    else{
        $('#keyword').removeClass("is-invalid");
    }
    if($('#location').val().length == 0 && button_2){
        $('#location').addClass("is-invalid");
    }
    else{
        $('#location').removeClass("is-invalid");
    }
});

$('#current-location').click(function(){
    button_1 = 1;
    button_2 = 0;
    document.getElementById("location").value = "";
    document.getElementById("location").disabled = true;
    $('#location').removeClass("is-invalid");
});

$('#other').click(function(){
    button_1 = 0;
    button_2 = 1;
    document.getElementById("location").disabled = false;
});

function init(){
    console.log("HAHA");
    button_1 = 1;
    button_2 = 0;
    document.getElementById("location").value = "";
    document.getElementById("location").disabled = true;
    $('#nav-1').addClass("he");
    $('#nav-2').addClass("he");
    $('#nav-3').addClass("he");
    $('#btn-star').removeClass("star-fill");
}

// function receive_events(){
//     fetch("/").then(function(value) {
//         if(value.ok){
//             console.log(value);
//             return value;
//         }
//         else{
//             return receive_events();
//         }
//     })
//     .then(
//         (value) => {
//             console.log(value);
//             console.log("JAJA");
//             ticketmaster = value;
//         }
//     );
// }

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

function send_ip(){
    console.log(typeof dz);
    console.log(typeof universal);
    var bbb;
    if($('#keyword').val().length != 0){
        bbb = {"Keyword" : $('#keyword').val()};
        console.log("Bbb");
        console.log(typeof bbb);
    }
    return $.ajax({
         type: 'GET',
         data: (bbb),
         contentType: 'application/json',
         url: 'http://localhost:3000/search',
         success: function(data) {
             data = JSON.parse(data);
             console.log('success');
             console.log(typeof data);
             events_ticketmaster = data;
             console.log(data._embedded.events[0].name);
         }
     });
}

// Referencing https://stackoverflow.com/questions/34404663/bootstrap-table-add-row-dynamically-javascript

$("#search").on("click",function(){
        function extract_ip(){
            return $.ajax('https://app.ticketmaster.com/discovery/v2/events.json?apikey=qcOhKgPQynndjc1pcDNq0flHYCg2ltMF',   // request url
            {
                success: function (data, status, xhr) {
                    universal = '['+JSON.stringify(data) + ']';
                    universal = JSON.parse(universal);
                }
            });
        }

    extract_ip();

    $.when(extract_ip()).done(function(a1){
        send_ip();
        $.when(send_ip()).done(function(a1){
            add_event();
        });
    });
});

$("#clear").on("click",function(){
    delete_rows();
    document.getElementById("keyword").value = '';
    button_1 = 1;
    button_2 = 0;
    document.getElementById("location").value = "";
    document.getElementById("location").disabled = true;
});

function star_button(){
    if(click == 0){
        $('#btn-star').addClass("star-fill");
        click =1;
    }
    else{
        $('#btn-star').removeClass("star-fill");
        click = 0;
    }
}

function add_row(newrow){
    var table = document.getElementById('table-event');
    var tbody = table;
    tbody.appendChild(newrow);
}

function add_venue_row(){
    var address = "";
    var city = "";
    var phone_number = "";
    var open_hours = "";
    var general_rule = "";
    var child_rule = "";

    if(events_ticketmaster._embedded.events[0]._embedded.venues[0].hasOwnProperty('address')){
        var newrow = document.createElement("tr");
        address = events_ticketmaster._embedded.events[0]._embedded.venues[0].address.line1;
        artist = createRowColumn(newrow);
        artist_string = createRowColumn(newrow);
        artist.innerHTML = "Address";
        artist_string.innerHTML = address;
        add_row(newrow);
    }
    if(events_ticketmaster._embedded.events[0]._embedded.venues[0].hasOwnProperty('city')){
        var newrow1 = document.createElement("tr");
        city = events_ticketmaster._embedded.events[0]._embedded.venues[0].city.name;
        artist = createRowColumn(newrow1);
        artist_string = createRowColumn(newrow1);
        artist.innerHTML = "City";
        artist_string.innerHTML = city;
        add_row(newrow1);
    }
    if(events_ticketmaster._embedded.events[0]._embedded.venues[0].boxOfficeInfo.hasOwnProperty('phoneNumberDetail')){
        var newrow2 = document.createElement("tr");
        phone_number = events_ticketmaster._embedded.events[0]._embedded.venues[0].boxOfficeInfo.phoneNumberDetail;
        artist = createRowColumn(newrow2);
        artist_string = createRowColumn(newrow2);
        artist.innerHTML = "Phone Number";
        artist_string.innerHTML = phone_number;
        add_row(newrow2);
    }
    if(events_ticketmaster._embedded.events[0]._embedded.venues[0].boxOfficeInfo.hasOwnProperty('openHoursDetail')){
        var newrow3 = document.createElement("tr");
        open_hours = events_ticketmaster._embedded.events[0]._embedded.venues[0].boxOfficeInfo.openHoursDetail;
        artist = createRowColumn(newrow3);
        artist_string = createRowColumn(newrow3);
        artist.innerHTML = "Open Hours";
        artist_string.innerHTML = open_hours;
        add_row(newrow3);
    }
    if(events_ticketmaster._embedded.events[0]._embedded.venues[0].generalInfo.hasOwnProperty('generalRule')){
        var newrow4 = document.createElement("tr");
        general_rule = events_ticketmaster._embedded.events[0]._embedded.venues[0].generalInfo.generalRule;
        artist = createRowColumn(newrow4);
        artist_string = createRowColumn(newrow4);
        artist.innerHTML = "General Rule";
        artist_string.innerHTML = general_rule;
        add_row(newrow4);
    }
    if(events_ticketmaster._embedded.events[0]._embedded.venues[0].generalInfo.hasOwnProperty('childRule')){
        var newrow5 = document.createElement("tr");
        child_rule = events_ticketmaster._embedded.events[0]._embedded.venues[0].generalInfo.childRule;
        artist = createRowColumn(newrow5);
        artist_string = createRowColumn(newrow5);
        artist.innerHTML = "Child Rule";
        artist_string.innerHTML = child_rule;
        add_row(newrow5);
    }

    var newrow6 = document.createElement("tr");
    child_rule = events_ticketmaster._embedded.events[0]._embedded.venues[0].generalInfo.childRule;
    // var img = document.createElement('img');
    // img.src = 'https://media.geeksforgeeks.org/wp-content/uploads/20190529122828/bs21.png';
    var table = document.getElementById('table-image');
    var tbody = table;

}

function add_event_row(){
    var artist;
    var artist_string="";
    var date = "";
    var artist1= "";
    var artist1_url= "";
    var artist_full = "";
    var venue= "";
    var segment= "";
    var gen= "";
    var subgen= "";
    var type= "";
    var subType= "";
    var genres = "";
    var status= "";
    var ticket_url= "";
    var price = "";
    var buy= "";
    var curr = 0;

    if(events_ticketmaster._embedded.events[curr]._embedded.attractions[0].hasOwnProperty('name')){
        var newrow = document.createElement("tr");
        artist = createRowColumn(newrow);
        artist_string = createRowColumn(newrow);
        artist.innerHTML = "Artist/Team(s)";
        console.log(events_ticketmaster._embedded.events[curr]._embedded.attractions.length);
        for(x = 0; x<events_ticketmaster._embedded.events[curr]._embedded.attractions.length; x++){
            artist1 = events_ticketmaster._embedded.events[curr]._embedded.attractions[x].name;
            if(x!=0){
                artist_full += ' | ';
            }
                artist_full += '<p2>' + artist1 + '</p2>';
        }
        artist_string.innerHTML = artist_full;
        add_row(newrow);
    }

    if(events_ticketmaster._embedded.events[curr]._embedded.venues[0].hasOwnProperty('name')){
        venue = '<p2> '+ events_ticketmaster._embedded.events[curr]._embedded.venues[0].name +'</p2>';
        newrow1 = document.createElement("tr");
        artist = createRowColumn(newrow1);
        artist_string = createRowColumn(newrow1);
        artist.innerHTML = "Venue";
        artist_string.innerHTML = venue;
        add_row(newrow1);
    }
    //TODO Change date
    date = events_ticketmaster._embedded.events[curr].dates.start.localDate;
    newrow2 = document.createElement("tr");
    artist = createRowColumn(newrow2);
    artist_string = createRowColumn(newrow2);
    artist.innerHTML = "Time";
    artist_string.innerHTML = date;
    add_row(newrow2);

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
    newrow3 = document.createElement("tr");
    artist = createRowColumn(newrow3);
    artist_string = createRowColumn(newrow3);
    artist.innerHTML = "Category";
    artist_string.innerHTML = genres;
    add_row(newrow3);

    if(events_ticketmaster._embedded.events[0].hasOwnProperty('priceRanges')){
        newrow4 = document.createElement("tr");
        price ='<p2> '+ events_ticketmaster._embedded.events[0].priceRanges[0].min + ' - '+ events_ticketmaster._embedded.events[0].priceRanges[0].max + ' USD' +'</p2>';
        artist = createRowColumn(newrow4);
        artist_string = createRowColumn(newrow4);
        artist.innerHTML = "Price Range";
        artist_string.innerHTML = price;
        add_row(newrow4);
    }

    if(events_ticketmaster._embedded.events[0].dates.status.hasOwnProperty('code')){
        status = '<p2> '+ events_ticketmaster._embedded.events[0].dates.status.code +'</p2>';
        newrow5 = document.createElement("tr");
        artist = createRowColumn(newrow5);
        artist_string = createRowColumn(newrow5);
        artist.innerHTML = "Ticket Status";
        artist_string.innerHTML = status;
        add_row(newrow5);
    }

    if(events_ticketmaster._embedded.events[curr].hasOwnProperty('url')){
        newrow6 = document.createElement("tr");
        ticket_url = events_ticketmaster._embedded.events[curr].url;
        buy = '<p2><a href= ' + ticket_url + ' target="_blank"> '+ 'Ticketmaster' +'</a></p2>';
        artist = createRowColumn(newrow6);
        artist_string = createRowColumn(newrow6);
        artist.innerHTML = "Buy Ticket At";
        artist_string.innerHTML = buy;
        add_row(newrow6);
    }

    newrow7 = document.createElement("tr");
    artist = createRowColumn(newrow7);
    artist_string = createRowColumn(newrow7);
    artist.innerHTML = "Seat Map";
    artist_string.innerHTML = 'events_ticketmaster._embedded.events[0].seatmap.staticUrl'; //TODO
    add_row(newrow7);
}


function initMap() {
  // The location of Uluru

  var latitude =1;
  var longitude;
  if(latitude ==1){
      latitude = -25.344;
      longitude = 131.036;
  }
  else{
      latitude = events_ticketmaster._embedded.events[0]._embedded.venues[0].location.latitude;
      longitude = events_ticketmaster._embedded.events[0]._embedded.venues[0].location.longitude;
  }
  const uluru = { lat: latitude, lng: longitude };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: uluru,
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
}

init();
// receive_events();

// });

// $("h1").removeClass("big-title");

// document.getElementById("search").addEventListener('click',loadText);
//
// function loadText(){
//     var xhr = new XMLHttpRequest();
//     xhr.open('GET', '', true);
//     xhr.onload = function(){
//         console.log("HA");
//     };
//     xhr.send();
// }
