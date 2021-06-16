/*jshint esversion: 8 */
// Div #
// h1."class"
//$(document).ready(function() {

var button_1;
var button_2;
var dz = [{"Roberto" : "Big Baller"}];
var universal;
var count = 0;

const apiHost = "http://localhost:3000";

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
    for(i = 0; i<20; i++){
        var newrow = document.createElement("tr");
        var number = createRowColumn(newrow);
        var date = createRowColumn(newrow);
        var event_name = createRowColumn(newrow);
        var category = createRowColumn(newrow);
        var venue_info = createRowColumn(newrow);
        var favorite = createRowColumn(newrow);
        // console.log("here");
        // console.log(universal['0']._embedded);

        number.innerHTML = count;
        count +=1;
        date.innerHTML = universal['0']._embedded.events[i].dates.start.localDate;
        event_name.innerHTML = '<a href="#expansion-table" onclick=event_details('+ i + '); return= false;> ' + universal['0']._embedded.events[i].name + ' </a>' ;
        var cat = universal['0']._embedded.events[i].classifications[0].segment.name + ' | ' +universal['0']._embedded.events[i].classifications[0].genre.name + ' | '+  universal['0']._embedded.events[i].classifications[0].subGenre.name;
        category.innerHTML = cat;
        venue_info.innerHTML = universal['0']._embedded.events[i]._embedded.venues[0].name;
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
    if($('#keyword').val().length != 0){
        //console.log(document.getElementById('keyword').val());
        bbb = {"Keyword" : $('#keyword').val()};
        //console.log(universal);
    }
    return $.ajax({
         type: 'GET',
         data: JSON.stringify({"Keyword" : $('#keyword').val()}),
         contentType: 'application/json',
         url: 'http://localhost:3000/search',
         success: function(data) {
             console.log('success');
             console.log(data);
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
        add_event();
    //    delete_event();
    });
});



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
