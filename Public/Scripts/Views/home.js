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
    zoom:17.5,
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
        // initMap();
    })
})}


    // .then( 
    // {
    //   origin: address.first,
    //   destination: address.second,
    //   provideRouteAlternatives: false,
    //   travelMode: 'DRIVING',
    //   drivingOptions: {
    //     departureTime: new Date(/* now, or future date */),
    //     trafficModel: 'pessimistic'
    //   },
    //   unitSystem: google.maps.UnitSystem.IMPERIAL
    // })



  $('#address').submit(function(event) {
    event.preventDefault();
    address.first = $('#addr-first').val();
    address.second = $('#addr-second').val();
    getCoordinates();
    window.location = updatedUrl;
});
