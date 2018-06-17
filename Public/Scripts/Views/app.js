'use strict';

let address = {};
var url = window.location.href;
var updatedUrl = url + "mapPage";

// var config = api.key;
function sayHi() {
    if (localStorage.getItem("login")) {
        const login = JSON.parse(localStorage.getItem("login"));
        $("#welcomeLoggedIn").html("Welcome back, " + login.username +"!");
    }
}


function setGoogleListener () {
    console.log("Adding google listener...");
    google.maps.event.addDomListener(window, 'load', autocomplete);
}

$('#address').submit(function(event) {
    event.preventDefault();
    address.first = $('#addr-first').val();
    address.second = $('#addr-second').val();
    getCoordinates();
});


function autocomplete() {
    console.log("Adding auto-complete...");
  var address1 = new google.maps.places.Autocomplete(document.getElementById('addr-first'));
  var address2 = new google.maps.places.Autocomplete(document.getElementById('addr-second'));
  console.log(address1);
  google.maps.event.addListener(address1, address2, 'place_changed', function () {
      var place = address1.getPlace();
      var place = address2.getPlace();
      var address = place.formatted_address;
      var latitude = place.geometry.location.lat();
      var longitude = place.geometry.location.lng();
      var mesg = "Address: " + address;
      mesg += "\nLatitude: " + latitude;
      mesg += "\nLongitude: " + longitude;
  });
}
function getCoordinates () {
    $.ajax({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address.first}&key=${config.api_key}`,
        type: 'GET'
    })
    .then(data => {
        console.log(data);
      address.firstCoordinates = data.results[0].geometry.location;
      $.ajax({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address.second}&key=${config.api_key}`,
        type: 'GET'
      })
      .then(data => {
        address.secondCoordinates = data.results[0].geometry.location;
        localStorage.setItem('coordinates', JSON.stringify(address));
      window.location = updatedUrl;
    })
})}

$(document).ready(()=> sayHi());
