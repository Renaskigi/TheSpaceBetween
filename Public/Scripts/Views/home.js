'use strict'

const API_KEY = 'AIzaSyC9RhI2XAtoSBUZXkxnbHrhojb2rhuufmM';
let address = {};
var url = window.location.href;
var updatedUrl = url + "mapPage";
var infowindow = new google.maps.InfoWindow();
let centerpoint;

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
  
  calcRoute(firstStaticLocation, portland, directionsDisplay, directionsService);

  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: firstStaticLocation,
    radius: 500,
    type: ['store']
  }, callback);
  directionsDisplay.setMap(map);
}

function callback(results, status) {
  console.log('results', results)
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc =  {lat:place.geometry.location.lat(),lng:place.geometry.location.lng()}
  console.log('place', placeLoc);
 
  var marker = new google.maps.Marker({
      position : placeLoc,
      setMap : map
  }); 
 
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
  function midpoint(lat1, long1, lat2, long2) {
    centerpoint = [lat1 + (lat2 - lat1) * .50, long1 + (long2 - long1) * .50];
  }
  midpoint(address.firstCoordinates.lat,address.firstCoordinates.lng, address.secondCoordinates.lat, address.secondCoordinates.lng);
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
