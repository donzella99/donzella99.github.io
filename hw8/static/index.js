/*jshint esversion: 8 */
// Div #
// h1."class"
//$(document).ready(function() {

// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

var button_1;
var button_2;
var dz = [{"Roberto" : "Big Baller"}];
var universal;
var count = 0;
var click =0;
const apiHost = "http://localhost:3001";
var events_ticketmaster = "none";
var keyword_result;
var curr = 0;
var final_location;
var radius;
var current_location;
var user_location;
var favorites = {};
var favorites_name = {};
var the_curr = 0;
var fav_count = 0;



function initMap(){
  // The location of Uluru
    if(events_ticketmaster == "none"){
      latitude = 34;
      longitude = -118;
    }
    else{
        latitude = parseFloat(events_ticketmaster._embedded.events[the_curr]._embedded.venues[0].location.latitude);
        longitude = parseFloat(events_ticketmaster._embedded.events[the_curr]._embedded.venues[0].location.longitude);
        console.log(latitude);
        console.log(longitude);
    }
    const uluru = { lat: latitude, lng: longitude };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: uluru,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
    position: uluru,
    map: map,
    });
}

function createRowColumn(row) {
    var column = document.createElement("td");
    row.appendChild(column);
    return column;
}

function delete_event_rows(){
    var y = (document.getElementById("table").rows.length);
    $('tr').addClass('hide-table');
    if(document.getElementById("table").rows.length >1){
        for(x = 1; x<y; x++){
            document.getElementById("table").deleteRow(1);
        }
    }
}

function delete_event_details(){
    var y = (document.getElementById("table-event").rows.length);
    console.log(y);
    if(document.getElementById("table-event").rows.length >1){
        for(x = 1; x<y; x++){
            document.getElementById("table-event").deleteRow(1);
        }
    }
}


// function event_details(){
//     delete_event_rows();
// }
//
// function add_favorites(){
// //
// }

function extract_ip(){
    return $.ajax('https://ipinfo.io/4.16.25.211?token=a8e8eac3e00672',   // request url
    {
        success: function (data, status, xhr) {
            universal = console.log(JSON.stringify(data));
            console.log(data.loc);
            final_location = data.loc;
            //universal = JSON.parse(universal);
        }
    });
}

$('#results').click(function(){
    $('#favorites').addClass("btn-change");
    $('#results').removeClass("btn-change");
});

$('#favorites').click(function(){
    $('#results').addClass("btn-change");
    $('#favorites').removeClass("btn-change");
});

function geo_coding(){
    var total_loc =$('#location').val().split(" ");
    console.log(total_loc);
    console.log("top");
    var new_loc = "";
    for(i = 0; i<total_loc.length; i++){
        new_loc += "+";
        new_loc += total_loc[i];
    }
    var geo_api = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAjU6cgR6QnwPyH5ICJAbcl7_D4NAxwJ2c&address=' + new_loc;
    console.log(geo_api);
    return $.ajax(geo_api,   // request url
    {
        success: function (data, status, xhr) {
            console.log("1");
            user_location = (data.results[0].geometry.location.lat + ',' +  data.results[0].geometry.location.lng);
            console.log(user_location);
            console.log("2");
            //console.log(user_location);
            //universal = JSON.parse(universal);
        }
    });
}

$('#search').click(function(){
    favorites = {};
    if($('#radius').val().length == 0){
        radius =10;
    }
    else{
        radius = $('#radius').val();
    }
    if($('#location').val().length == 0 && button_2){
        $('#location').addClass("is-invalid");
        if($('#keyword').val().length == 0){
            $('#keyword').addClass("is-invalid");
        }
    }
    else if(button_1 || ($('#location').val().length != 0 && button_2)){
        if($('#keyword').val().length == 0){
            $('#keyword').addClass("is-invalid");
        }
        else{
            delete_event_details();
            console.log("here");
            $('#keyword').removeClass("is-invalid");
            extract_ip();
            $.when(extract_ip()).done(function(a1){
                if(button_1){
                    current_location = final_location;
                    send_ip();
                    $('#table').addClass('hide-table');
                    $('tr').addClass('hide-table');
                    $.when(send_ip()).done(function(a1){
                        add_event();
                    });
                    $('tr').removeClass('hide-table');
                }
                else if($('#location').val().length != 0 && button_2){
                    geo_coding();
                    $.when(geo_coding()).done(function(a1){
                        current_location = user_location;
                        console.log(user_location);
                        send_ip();
                        $.when(send_ip()).done(function(a1){
                            add_event();
                        });
                    });
                }
            });
        }
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
    for(i = 0; i<localStorage.length; i ++)
    {
        console.log(localStorage.getItem(i));
    }
    console.log("init");
    console.log((localStorage.getItem(0)));
    console.log("init");
    fav_count = localStorage.length;
    console.log(fav_count);
    //localStorage.clear();
    // localStorage.removeItem(0);
    // localStorage.removeItem(1);
    // localStorage.removeItem(2);
    document.getElementById("results").disabled = true;
    document.getElementById("favorites").disabled = true;
    $('#map').addClass('hide-table');
    document.getElementById('no-results').innerHTML = "";
    $('.my-tab').hide();
    $('tr').addClass('hide-table');
    button_1 = 1;
    button_2 = 0;
    document.getElementById("location").value = "";
    document.getElementById("location").disabled = true;
    radius = 10;
    $('#nav-1').addClass("he");
    $('#nav-2').addClass("he");
    $('#nav-3').addClass("he");
    $('#btn-star').removeClass("star-fill");
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

function add_storage(i){
    var segment="";
    var genres="";
    var gen= "";
    var subgen= "";
    var type= "";
    var subType= "";
    if(events_ticketmaster._embedded.events[i].classifications[0].hasOwnProperty('segment')){
        segment = events_ticketmaster._embedded.events[i].classifications[0].segment.name;
        if(segment != 'Undefined'){
            genres += '<p2> '+ segment + ' |' +'</p2>';
        }
    }
    if(events_ticketmaster._embedded.events[i].classifications[0].hasOwnProperty('genre')){
         gen = events_ticketmaster._embedded.events[i].classifications[0].genre.name;
         if(gen != 'Undefined'){
             genres += '<p2> '+ gen + ' |' +'</p2>';
         }
    }
    if(events_ticketmaster._embedded.events[i].classifications[0].hasOwnProperty('subGenre')){
        subgen = events_ticketmaster._embedded.events[i].classifications[0].subGenre.name;
        if(subgen != 'Undefined'){
            genres += '<p2> '+ subgen + ' |' +'</p2>';
        }
    }
    if(events_ticketmaster._embedded.events[i].classifications[0].hasOwnProperty('type')){
        type = events_ticketmaster._embedded.events[i].classifications[0].type.name;
        if(type != 'Undefined'){
            genres += '<p2> '+ type + ' |' +'</p2>';
        }
    }
    if(events_ticketmaster._embedded.events[i].classifications[0].hasOwnProperty('subType')){
        subType = events_ticketmaster._embedded.events[i].classifications[0].subType.name;
        if(subType != 'Undefined'){
            genres += '<p2> '+ subType +'</p2>';
        }
    }
    console.log("checkpoint");
    console.log(events_ticketmaster._embedded.events[i].dates.start.localDate);
    localStorage.setItem(fav_count,events_ticketmaster._embedded.events[i].dates.start.localDate);
    fav_count++;
    localStorage.setItem(fav_count,events_ticketmaster._embedded.events[i].name);
    fav_count++;
    localStorage.setItem(fav_count,genres);
    fav_count++;
    localStorage.setItem(fav_count,events_ticketmaster._embedded.events[i]._embedded.venues[0].name);
    fav_count++;
    console.log(fav_count);
    console.log("Start");
     for(t=0; t<localStorage.length; t++){
             console.log((localStorage.getItem(t)));
     }
    console.log("End");
}

function send_ip(){
    // console.log(typeof dz);
    // console.log(typeof universal);
    var bbb;
    if($('#keyword').val().length != 0){
        keyword_result = $('#keyword').val();
        // console.log("Bbb");
        // console.log(typeof keyword_result);
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
    var total = {"Keyword": keyword_result, "geoPoint" : current_location, "Category": category_selected, "Radius" : radius};
    return $.ajax({
         type: 'GET',
         data: (total),
         contentType: 'application/json',
         url: 'http://localhost:3001/search',
         success: function(data) {
             data = JSON.parse(data);
             console.log('success');
             console.log(typeof data);
             events_ticketmaster = data;
         }
     });
}

// Referencing https://stackoverflow.com/questions/34404663/bootstrap-table-add-row-dynamically-javascript

// $("#search").on("click",function(){
//
// });

$("#clear").on("click",function(){
    localStorage.clear();
    fav_count = 0;
    delete_event_rows();
    document.getElementById("keyword").value = '';
    button_1 = 1;
    button_2 = 0;
    document.getElementById("location").value = "";
    document.getElementById("location").disabled = true;
});

function star_button(){
    if(search_favorites(events_ticketmaster._embedded.events[curr].name, events_ticketmaster._embedded.events[curr].dates.start.localDate)){
        console.log("exists");
        remove_favorites(events_ticketmaster._embedded.events[curr].name, events_ticketmaster._embedded.events[curr].dates.start.localDate);
        $('#star').removeClass("star-fill");
        favorites[curr]= 0;
    }
    else{
        $('#star').addClass("star-fill");
        favorites[curr]= 1;
        add_storage(curr);
    }
}

function search_favorites(name, date){
    var result =0;
    var cnt = 0;
    for(i = 0; i<localStorage.length; i ++)
    {
        // console.log("i");
        // console.log(i);
        // console.log(localStorage.getItem(i));
        // console.log(name);
        // console.log(date);
        if((localStorage.getItem(i)) == name || (localStorage.getItem(i)) == date){
            cnt++;
        }
    }
    if(cnt == 2){
        result = 1;
    }
    console.log(result);
    return result;
}

function remove_favorites(name,date){
    var result =0;
    var cnt = 0;
    var good =0;
    for(i = 0; i<localStorage.length; i ++)
    {
        console.log(localStorage.getItem(i));
        if((localStorage.getItem(i)) == name || (localStorage.getItem(i)) == date){
            cnt++;
        }
        if(cnt == 2){
                result = i;
                cnt=0;
                good =1;
        }
    }
    console.log("not_now-Removal");
    console.log("result");
        for(t=0; t<localStorage.length; t++){
            console.log(localStorage.getItem(t));
        }
        console.log("now-Removal");
        var res1 = result-1;
        var res2 = result+1;
        var res3 =  result+2;
        console.log(result);
        if(good){
            localStorage.setItem(res1," ");
            localStorage.setItem(result," ");
            localStorage.setItem(res2," ");
            localStorage.setItem(res3," ");
        }

        // localStorage.removeItem(result);
        // localStorage.removeItem(res1);
        // localStorage.removeItem(res2);
        // localStorage.removeItem(res3);

    console.log("Start-Removal");
        for(t=0; t<localStorage.length; t++){
            console.log(localStorage.getItem(t));
        }
        console.log("End-Removal");

}

function star_button2(favorite,i){
    // console.log(i);
    var name = events_ticketmaster._embedded.events[i].name;
    var date = events_ticketmaster._embedded.events[i].dates.start.localDate;
    // console.log(name);
    // console.log(date);
    if(search_favorites(name, date)){
        console.log("exists");
        remove_favorites(name,date);
        console.log('#' + favorite.id);
        $('#' + favorite.id).removeClass("star-fill");
        favorites[i]= 0;
    }
    else{
        console.log("doesnt exist");
        $('#' + favorite.id).addClass("star-fill");
        favorites[i]= 1;
        add_storage(i);
    }
}

function add_row(newrow){
    var table = document.getElementById('table-event');
    var tbody = table;
    tbody.appendChild(newrow);
}

function add_venue_row(newrow){
    var table = document.getElementById('table-venue');
    var tbody = table;
    tbody.appendChild(newrow);
}

function add_favorites(){
    var seen = 0;
    var ct = 0;
    $('#map').addClass('hide-table');
    $('.my-tab').hide();
    console.log("FAV");
    if(events_ticketmaster.page.totalElements<20){
        max = events_ticketmaster.page.totalElements;
    }
    if(document.getElementById("table").rows.length > 1){
        delete_event_rows();
    }
    for(i = 0; i<localStorage.length; i++)
    {
        console.log(localStorage.getItem(i));
        if((localStorage.getItem(i) != null) && (localStorage.getItem(i) != " ")){
            seen =1;
            var newrow1 = document.createElement("tr");
            var number = createRowColumn(newrow1);
            var date = createRowColumn(newrow1);
            var event_name = createRowColumn(newrow1);
            var category = createRowColumn(newrow1);
            var venue_info = createRowColumn(newrow1);
            var favorite = createRowColumn(newrow1);
            var fav_id = 'table' + i;

            number.innerHTML = ct;
            date.innerHTML = localStorage.getItem(i);
            event_name.innerHTML = localStorage.getItem(i+1);
            category.innerHTML = localStorage.getItem(i+2);
            venue_info.innerHTML = localStorage.getItem(i+3);
            i = i+3;

            var table = document.getElementById('table');
            var tbody = table.querySelector('tbody');
            tbody.appendChild(newrow1);
            favorite.innerHTML = '<a class="navbar-brand" href="#" onclick="tweet(curr)"> <img src="trash.png" width="30" height="30" alt=""> </a>';
            $(favorite).addClass("star-fill");
            ct++;
        }
        console.log(localStorage.getItem(i));
    }
    if(seen == 0){
        console.log("a");
        var newrow = document.createElement("tr");
        var no_items = createRowColumn(newrow);
        var no_items1 = createRowColumn(newrow);
        var no_items2 = createRowColumn(newrow);
        var no_items3 = createRowColumn(newrow);
        var no_items4 = createRowColumn(newrow);

        no_items.innerHTML = "No Favorites Found!";
        var table1 = document.getElementById('table');
        var tbody1 = table1.querySelector('tbody');
        tbody1.appendChild(newrow);
    }
    delete_event_details();
    $(".progress-bar").animate({
        width: "100%"
    }, 1000, function() {
            $('#nav-1').removeClass("he");
            $('#nav-2').addClass("he");
            $('#nav-3').addClass("he");
            $('#table').removeClass('hide-table');
            $('tr').removeClass('hide-table');
            $(this).closest('.progress').fadeOut();
    });
    $('#tr1').removeClass('hide-table');
    $('#table').removeClass('hide-table');
    document.getElementById('fav').innerHTML = "Remove";
}


function add_event() {
    document.getElementById('fav').innerHTML = "Favorite";
    document.getElementById("results").disabled = false;
    document.getElementById("favorites").disabled = false;
    $('#map').addClass('hide-table');
    $('.my-tab').hide();
    delete_event_details();
    var max = 20;
    if(events_ticketmaster.page.totalElements<20){
        max = events_ticketmaster.page.totalElements;
    }
    if(document.getElementById("table").rows.length > 1){
        delete_event_rows();
    }

    if(events_ticketmaster.page.totalElements==0){


        document.getElementById('no-results').innerHTML = "No Results Found... Please Try Again or Enter a New Keyword!";
        document.getElementById("results").disabled = true;
        document.getElementById("favorites").disabled = true;
    }
    else{
        document.getElementById('no-results').innerHTML = "";
        for(y = 0; y<max; y++){
            var newrow = document.createElement("tr");
            var number = createRowColumn(newrow);
            var date = createRowColumn(newrow);
            var event_name = createRowColumn(newrow);
            var category = createRowColumn(newrow);
            var venue_info = createRowColumn(newrow);
            var favorite = createRowColumn(newrow);
            favorite.id = 'table' + y;
            var fav_id = 'table' + y;
            // console.log("here");
            // console.log(universal['0']._embedded);
            count= y+1;
            number.innerHTML = count;
            date.innerHTML = events_ticketmaster._embedded.events[y].dates.start.localDate;
            event_name.innerHTML = '<a href="#" onclick=add_event_row('+ y + '); return= false;> ' + events_ticketmaster._embedded.events[y].name + ' </a>' ;

            var segment="";
            var genres="";
            var gen= "";
            var subgen= "";
            var type= "";
            var subType= "";

            if(events_ticketmaster._embedded.events[y].classifications[0].hasOwnProperty('segment')){
                segment = events_ticketmaster._embedded.events[y].classifications[0].segment.name;
                if(segment != 'Undefined'){
                    genres += '<p2> '+ segment + ' |' +'</p2>';
                }
            }
            if(events_ticketmaster._embedded.events[y].classifications[0].hasOwnProperty('genre')){
                 gen = events_ticketmaster._embedded.events[y].classifications[0].genre.name;
                 if(gen != 'Undefined'){
                     genres += '<p2> '+ gen + ' |' +'</p2>';
                 }
            }
            if(events_ticketmaster._embedded.events[y].classifications[0].hasOwnProperty('subGenre')){
                subgen = events_ticketmaster._embedded.events[y].classifications[0].subGenre.name;
                if(subgen != 'Undefined'){
                    genres += '<p2> '+ subgen + ' |' +'</p2>';
                }
            }
            if(events_ticketmaster._embedded.events[y].classifications[0].hasOwnProperty('type')){
                type = events_ticketmaster._embedded.events[y].classifications[0].type.name;
                if(type != 'Undefined'){
                    genres += '<p2> '+ type + ' |' +'</p2>';
                }
            }
            if(events_ticketmaster._embedded.events[y].classifications[0].hasOwnProperty('subType')){
                subType = events_ticketmaster._embedded.events[y].classifications[0].subType.name;
                if(subType != 'Undefined'){
                    genres += '<p2> '+ subType +'</p2>';
                }
            }
            category.innerHTML = genres;
            venue_info.innerHTML = events_ticketmaster._embedded.events[y]._embedded.venues[0].name;

            favorite.innerHTML = '<a class="navbar-brand" onclick=star_button2(' + fav_id + ',' + y + ') id="star-1" rel=”No-Refresh”><span class="fa fa-star" id="btn-star"></span></a>';
            if(search_favorites(events_ticketmaster._embedded.events[y].name,events_ticketmaster._embedded.events[y].dates.start.localDate)){
                console.log("HASH");
                    console.log(favorite.id);
                    $(favorite).addClass("star-fill");
            }
            // var checkbox = document.createElement("input");
            // checkbox.setAttribute("type", "checkbox");
            // favorite.appendChild(checkbox);

            var table = document.getElementById('table');
            var tbody = table.querySelector('tbody');
            tbody.appendChild(newrow);
        }
    }
    $(".progress-bar").animate({
        width: "100%"
    }, 1000, function() {
            $('#nav-1').removeClass("he");
            $('#nav-2').addClass("he");
            $('#nav-3').addClass("he");
            $('#table').removeClass('hide-table');
            $('tr').removeClass('hide-table');
            $(this).closest('.progress').fadeOut();
    });
}

function fake(){
    return false;
}

function add_venue_row(){
    $('#map').removeClass('hide-table');
    the_curr = curr;
    initMap();
    var address = "";
    var city = "";
    var phone_number = "";
    var open_hours = "";
    var general_rule = "";
    var child_rule = "";

    delete_event_details();

    if(events_ticketmaster._embedded.events[curr]._embedded.venues[0].hasOwnProperty('address')){
        var newrow = document.createElement("tr");
        address = events_ticketmaster._embedded.events[curr]._embedded.venues[0].address.line1;
        artist = createRowColumn(newrow);
        artist_string = createRowColumn(newrow);
        artist.innerHTML = "Address";
        artist_string.innerHTML = address;
        add_row(newrow);
    }
    if(events_ticketmaster._embedded.events[curr]._embedded.venues[0].hasOwnProperty('city')){
        var newrow1 = document.createElement("tr");
        city = events_ticketmaster._embedded.events[curr]._embedded.venues[0].city.name;
        artist = createRowColumn(newrow1);
        artist_string = createRowColumn(newrow1);
        artist.innerHTML = "City";
        artist_string.innerHTML = city;
        add_row(newrow1);
    }
    if(events_ticketmaster._embedded.events[curr]._embedded.venues[0].hasOwnProperty('boxOfficeInfo')){
        if(events_ticketmaster._embedded.events[curr]._embedded.venues[0].boxOfficeInfo.hasOwnProperty('phoneNumberDetail')){
            var newrow2 = document.createElement("tr");
            phone_number = events_ticketmaster._embedded.events[curr]._embedded.venues[0].boxOfficeInfo.phoneNumberDetail;
            artist = createRowColumn(newrow2);
            artist_string = createRowColumn(newrow2);
            artist.innerHTML = "Phone Number";
            artist_string.innerHTML = phone_number;
            add_row(newrow2);
        }
        if(events_ticketmaster._embedded.events[curr]._embedded.venues[0].boxOfficeInfo.hasOwnProperty('openHoursDetail')){
            var newrow3 = document.createElement("tr");
            open_hours = events_ticketmaster._embedded.events[curr]._embedded.venues[0].boxOfficeInfo.openHoursDetail;
            artist = createRowColumn(newrow3);
            artist_string = createRowColumn(newrow3);
            artist.innerHTML = "Open Hours";
            artist_string.innerHTML = open_hours;
            add_row(newrow3);
        }
    }
    if(events_ticketmaster._embedded.events[curr]._embedded.venues[0].hasOwnProperty('generalInfo')){
        if(events_ticketmaster._embedded.events[curr]._embedded.venues[0].generalInfo.hasOwnProperty('generalRule')){
            var newrow4 = document.createElement("tr");
            general_rule = events_ticketmaster._embedded.events[curr]._embedded.venues[0].generalInfo.generalRule;
            artist = createRowColumn(newrow4);
            artist_string = createRowColumn(newrow4);
            artist.innerHTML = "General Rule";
            artist_string.innerHTML = general_rule;
            add_row(newrow4);
        }
        if(events_ticketmaster._embedded.events[curr]._embedded.venues[0].generalInfo.hasOwnProperty('childRule')){
            var newrow5 = document.createElement("tr");
            child_rule = events_ticketmaster._embedded.events[curr]._embedded.venues[0].generalInfo.childRule;
            artist = createRowColumn(newrow5);
            artist_string = createRowColumn(newrow5);
            artist.innerHTML = "Child Rule";
            artist_string.innerHTML = child_rule;
            add_row(newrow5);
        }

        var newrow6 = document.createElement("tr");
        child_rule = events_ticketmaster._embedded.events[curr]._embedded.venues[0].generalInfo.childRule;
        // var img = document.createElement('img');
        // img.src = 'https://media.geeksforgeeks.org/wp-content/uploads/20190529122828/bs21.png';
        var table = document.getElementById('table-image');
        var tbody = table;
    }

}

function add_event_row(i){
    $('#map').addClass('hide-table');
    $('.my-tab').show();
    $('#nav-1').addClass("he");
    $('#nav-2').removeClass("he");
    $('#nav-3').addClass("he");
    curr = i;
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

    delete_event_details();

    delete_event_rows();
    //TODO

    if(events_ticketmaster._embedded.events[curr]._embedded.hasOwnProperty('attractions')){
        var newrow = document.createElement("tr");
        artist = createRowColumn(newrow);
        artist_string = createRowColumn(newrow);
        artist.innerHTML = "Artist/Team(s)";
        console.log(events_ticketmaster._embedded.events[curr]._embedded.attractions.length);
        artist_full = "";
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

    if(events_ticketmaster._embedded.events[i].classifications[0].hasOwnProperty('segment')){
        segment = events_ticketmaster._embedded.events[i].classifications[0].segment.name;
        if(segment != 'Undefined'){
            genres += '<p2> '+ segment + ' |' +'</p2>';
        }
    }
    if(events_ticketmaster._embedded.events[i].classifications[0].hasOwnProperty('genre')){
         gen = events_ticketmaster._embedded.events[i].classifications[0].genre.name;
         if(gen != 'Undefined'){
             genres += '<p2> '+ gen + ' |' +'</p2>';
         }
    }
    if(events_ticketmaster._embedded.events[i].classifications[0].hasOwnProperty('subGenre')){
        subgen = events_ticketmaster._embedded.events[i].classifications[0].subGenre.name;
        if(subgen != 'Undefined'){
            genres += '<p2> '+ subgen + ' |' +'</p2>';
        }
    }
    if(events_ticketmaster._embedded.events[i].classifications[0].hasOwnProperty('type')){
        type = events_ticketmaster._embedded.events[i].classifications[0].type.name;
        if(type != 'Undefined'){
            genres += '<p2> '+ type + ' |' +'</p2>';
        }
    }
    if(events_ticketmaster._embedded.events[i].classifications[0].hasOwnProperty('subType')){
        subType = events_ticketmaster._embedded.events[i].classifications[0].subType.name;
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
    if(search_favorites(events_ticketmaster._embedded.events[curr].name,events_ticketmaster._embedded.events[curr].dates.start.localDate)){
            $('#star').addClass('star-fill');
    }
    else{
        $('#star').removeClass('star-fill');
    }
    $('#tr1').addClass('hide-table');
    $('#table').addClass('hide-table');
}

function tweet(curr){
    var temp_event = events_ticketmaster._embedded.events[curr].name;
    var temp_venue = events_ticketmaster._embedded.events[curr]._embedded.venues[0].name;
    var total = "https://twitter.com/intent/tweet?text=Check out " + temp_event + " located at " + temp_venue + " #CSCI571EventSearch";
    window.open(total);
}

init();
//search_favorites();
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
