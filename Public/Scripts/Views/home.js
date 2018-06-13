'use strict'

const API_KEY = 'AIzaSyC9RhI2XAtoSBUZXkxnbHrhojb2rhuufmM';
let address = {};
var url = window.location.href;
var updatedUrl = url + "mapPage";

function initMap() {
  address = JSON.parse(localStorage.getItem('coordinates'));
  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();
  var firstStaticLocation = new google.maps.LatLng(address.firstCoordinates.lat,address.firstCoordinates.lng);
  var portland = new google.maps.LatLng(address.secondCoordinates.lat,address.secondCoordinates.lng);
  var mapOptions = {
    zoom: 17,
    center: firstStaticLocation
  }
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  directionsDisplay.setMap(map);
  calcRoute(firstStaticLocation, portland, directionsDisplay, directionsService);
}

function calcRoute(first, second, directionsDisplay, directionsService) {
  var request = {
    origin: first,
    destination: second,
    travelMode: 'DRIVING'
  };
  directionsService.route(request, function(result, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(result);
    }
  });
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
        origins: [first],
        destinations: [second],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        avoidHighways: false,
        avoidTolls: false
    }, function (response, status) {
        if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
            var distance = response.rows[0].elements[0].distance.text;
            var duration = response.rows[0].elements[0].duration.text;
            var dvDistance = document.getElementById("dvDistance");
           dvDistance.innerHTML = "";
            dvDistance.innerHTML += "Distance: " + distance + "<br />";
            dvDistance.innerHTML += "Duration:" + duration;
 
        } else {
            alert("Unable to find the distance via road.");
        }
    });
}


function getCoordinates () {
    $.ajax({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address.first}&key=${API_KEY}`,
        type: 'GET'
    })
    .then(data => { 
      address.firstCoordinates = data.results[0].geometry.location;      
      $.ajax({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address.second}&key=${API_KEY}`,
        type: 'GET'
      })
      .then(data => { 
        address.secondCoordinates = data.results[0].geometry.location;
        localStorage.setItem('coordinates', JSON.stringify(address));
      window.location = updatedUrl;

    })
})}

$('#address').submit(function(event) {
    event.preventDefault();
    address.first = $('#addr-first').val();
    address.second = $('#addr-second').val();
    getCoordinates();
});




