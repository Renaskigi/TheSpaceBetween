'use strict'
//if menu clicked, X will show so user knows to exit menu
// $('.icon-menu').on('click', function(event) {
//   $('.icon-menu').toggleClass('icon-cross');
// })
const API_KEY = '';
const address = {};
var url = window.location.href;
var updatedUrl = url + "mapPage";

$('#address').submit(function(event) {
    event.preventDefault();
    address.first = $('#addr-first').val();
    address.second = $('#addr-second').val();
    console.log(address.first);
    console.log(address.second);
    getCoordinates();
    window.location = updatedUrl;
    // computeDistanceBetween(address.firstCoordinates, address.secondCoordinates);
});

console.log(address.first);

function getCoordinates () {
    $.ajax({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address.first}&key=${API_KEY}`,
        type: 'GET'
    })
    .then(data => address.firstCoordinates = data.results[0].geometry.location,
          err => console.log(err))
    $.ajax({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address.second}&key=${API_KEY}`,
      type: 'GET'
    })
    .then(data => address.secondCoordinates = data.results[0].geometry.location,
          err => console.log(err))
    $.ajax({
      url: `https://maps.googleapis.com/maps/api/directions/json?origin=${address.first}&destination=${address.second}&key=${API_KEY}`,
      type: 'GET'
    })
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
}

  // function initMap() {
  //   var map = new google.maps.Map(document.getElementById('map'), {
  //     zoom: 8,
  //     center: {lat: 40.731, lng: -73.997}
  //   });
  //   var geocoder = new google.maps.Geocoder;
  //   var infowindow = new google.maps.InfoWindow;

  //   document.getElementById('submit').addEventListener('click', function() {
  //     geocodeLatLng(geocoder, map, infowindow);
  //   });
  // }

  function initMap() {

    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var firstStaticLocation = new google.maps.LatLng(37.7699298, -122.4469157);
    var portland = new google.maps.LatLng(45.5122, -122.6587);
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