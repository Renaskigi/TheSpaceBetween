'use strict'
//if menu clicked, X will show so user knows to exit menu
// $('.icon-menu').on('click', function(event) {
//   $('.icon-menu').toggleClass('icon-cross');
// })
const API_KEY = 'AIzaSyC9RhI2XAtoSBUZXkxnbHrhojb2rhuufmM';
const address = {};

$('#address').submit(function(event) {
    event.preventDefault();
    address.first = $('#addr-first').val();
    address.second = $('#addr-second').val();
    console.log(address.first);
    console.log(address.second);
    getCoordinates();

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
    .then( 
    {
      origin: address.first,
      destination: address.second,
      provideRouteAlternatives: false,
      travelMode: 'DRIVING',
      drivingOptions: {
        departureTime: new Date(/* now, or future date */),
        trafficModel: 'pessimistic'
      },
      unitSystem: google.maps.UnitSystem.IMPERIAL
    })
}

  function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: {lat: 40.731, lng: -73.997}
    });
    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;

    document.getElementById('submit').addEventListener('click', function() {
      geocodeLatLng(geocoder, map, infowindow);
    });
  }

