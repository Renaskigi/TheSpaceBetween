'use strict'

const API_KEY = 'AIzaSyC9RhI2XAtoSBUZXkxnbHrhojb2rhuufmM';
let address = {};
var url = window.location.href;
var updatedUrl = url + "mapPage";
var infowindow;
var map;
let centerpoint;

function initMap() {
  infowindow = new google.maps.InfoWindow();
  address = JSON.parse(localStorage.getItem('coordinates'));
    function midpoint(lat1, long1, lat2, long2) {
      centerpoint = [lat1 + (lat2 - lat1) * .50, long1 + (long2 - long1) * .50];
    }
    midpoint(address.firstCoordinates.lat,address.firstCoordinates.lng, address.secondCoordinates.lat, address.secondCoordinates.lng);
  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();
  var firstStaticLocation = new google.maps.LatLng(address.firstCoordinates.lat,address.firstCoordinates.lng);
  var portland = new google.maps.LatLng(address.secondCoordinates.lat,address.secondCoordinates.lng);
  var mapOptions = {
    zoom: 20,
    center: new google.maps.LatLng(centerpoint[0], centerpoint[1])
  }
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  
  calcRoute(firstStaticLocation, portland, directionsDisplay, directionsService);

  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: firstStaticLocation,
    radius: 500,
    type: ['cafe','night_club', 'library', 'bar', 'school', 'park']
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
  });
  marker.setMap(map);
 
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
  new google.maps.Marker({position : {lat: 45.428605, lng: -122.53876600000001}, setMap : map})

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

google.maps.event.addDomListener(window, 'load', function () {
  var address1 = new google.maps.places.Autocomplete(document.getElementById('addr-first'));
  var address2 = new google.maps.places.Autocomplete(document.getElementById('addr-second'));
  google.maps.event.addListener(address1, address2, 'place_changed', function () {
      var place = address1.getPlace();
      var place = address2.getPlace();
      var address = place.formatted_address;
      var latitude = place.geometry.location.lat();
      var longitude = place.geometry.location.lng();
      var mesg = "Address: " + address;
      mesg += "\nLatitude: " + latitude;
      mesg += "\nLongitude: " + longitude;
      alert(mesg);
  });
});







var markers = []

// start out with filter features set to false, so no filtering happens by default
var filters = {shower:false, vault:false, flush:false}

$(function () {
    $('input[name=filter]').change(function (e) {
     map_filter(this.id);
      filter_markers()
  });


})

var get_set_options = function() {
  ret_array = []
  for (option in filters) {
    if (filters[option]) {
      ret_array.push(option)
    }
  }
  return ret_array;
}

var filter_markers = function() {  
  set_filters = get_set_options()
  
  // for each marker, check to see if all required options are set
  for (i = 0; i < markers.length; i++) {
    marker = markers[i];

    // start the filter check assuming the marker will be displayed
    // if any of the required features are missing, set 'keep' to false
    // to discard this marker
    keep=true
    for (opt=0; opt<set_filters.length; opt++) {
      if (!marker.properties[set_filters[opt]]) {
        keep = false;
      }
    }
    marker.setVisible(keep)
  }
}

var map_filter = function(id_val) {
   if (filters[id_val]) 
      filters[id_val] = false
   else
      filters[id_val] = true
}


// after the geojson is loaded, iterate through the map data to create markers
// and add the pop up (info) windows
function loadMarkers() {
  console.log('creating markers')
  var infoWindow = new google.maps.InfoWindow()
  geojson_url = 'https://raw.githubusercontent.com/gizm00/blog_code/master/appendto/python_maps_2/collection.geojson'
  $.getJSON(geojson_url, function(result) {
      // Post select to url.
      data = result['features']
      $.each(data, function(key, val) {
        var point = new google.maps.LatLng(
                parseFloat(val['geometry']['coordinates'][1]),
                parseFloat(val['geometry']['coordinates'][0]));
        var titleText = val['properties']['title']
        var descriptionText = val['properties']['description']
        var marker = new google.maps.Marker({
          position: point,
          title: titleText,
          map: map,
          properties: val['properties']
         });

        var markerInfo = "<div><h3>" + titleText + "</h3>Amenities: " + descriptionText + "</div>"


        marker.addListener('click', function() {
           $('#campground_info').html(markerInfo)
        });
        markers.push(marker)
        
      });
  });
}

function initMap() {
    map_options = {
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.HYBRID,
      center: {lat: 42.9456, lng: -122.2}
    }
    
    map_document = document.getElementById('map')
    map = new google.maps.Map(map_document,map_options);
    loadMarkers()
 
}

google.maps.event.addDomListener(window, 'load', initMap);
