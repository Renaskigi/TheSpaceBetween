'use strict'

let address = {};
var infowindow;
var map;
let centerpoint;
var firstStaticLocation;
var portland;
var markersArray = [];
var marker;


function initMap() {
  infowindow = new google.maps.InfoWindow();
  address = JSON.parse(localStorage.getItem('coordinates'));
    function midpoint(lat1, long1, lat2, long2) {
      centerpoint = [lat1 + (lat2 - lat1) * .50, long1 + (long2 - long1) * .50];
    }
    midpoint(address.firstCoordinates.lat,address.firstCoordinates.lng, address.secondCoordinates.lat, address.secondCoordinates.lng);
  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();
  firstStaticLocation = new google.maps.LatLng(address.firstCoordinates.lat,address.firstCoordinates.lng);
  portland = new google.maps.LatLng(address.secondCoordinates.lat,address.secondCoordinates.lng);
  var mapOptions = {
    zoom: 20,
    // mapTypeId: google.maps.MapTypeId.HYBRID,
    center: new google.maps.LatLng(centerpoint[0], centerpoint[1])
  }
  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  calcRoute(firstStaticLocation, portland, directionsDisplay, directionsService);


  //move the script below outside in init map fucntion so you can use the types. line 32-37?//

  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: new google.maps.LatLng(centerpoint[0], centerpoint[1]),
    radius: 500,
    type: ['cafe','night_club', 'library', 'bar', 'school', 'park']

  }, callback);

  directionsDisplay.setMap(map);
  placeMarkers();
  search_types();
}

function callback(results, status) {
  console.log('results', results)
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
  localStorage.setItem('results', JSON.stringify(results));
}

function createMarker(place) {
  var placeLoc =  {lat:place.geometry.location.lat(),lng:place.geometry.location.lng()}
  console.log('place', placeLoc);
  var marker = new google.maps.Marker({
      position : placeLoc,
  });
  marker.setMap(map);

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
    'Hours: ' + place.opening_hours + '<br>' +
    '</div>');
    console.log(place);

    infowindow.open(map, this);
  });
  new google.maps.Marker({position : {lat: 45.428605, lng: -122.53876600000001}, setMap : map})

  function midpoint(lat1, long1, lat2, long2) {
    centerpoint = [lat1 + (lat2 - lat1) * .50, long1 + (long2 - long1) * .50];
  }
  midpoint(address.firstCoordinates.lat,address.firstCoordinates.lng, address.secondCoordinates.lat, address.secondCoordinates.lng);
  localStorage.setItem('place', JSON.stringify(place));
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


function placeMarkers() {
  var service = new google.maps.places.PlacesService(map);
service.nearbySearch({
  location: new google.maps.LatLng(centerpoint[0], centerpoint[1]),
  radius: 500,
  type: ['cafe', 'library', 'bar', 'school', 'park']
}, callback);
}

$('.filter-categories').on('click', 'input', function(){
  const type = $('.check-button:checked').map(checkbox=> checkbox.val())
  // get the values of each checked box and assign to a variablw
  // run the placeMarkers function agaig inside of the event handler var newTypes = checkbox values
  // pass the variable of checkbox values to the placeMarkers function type:


  // var keys = type = $('.checked-button:checked')
  // console.log(this);
  // console.log($('.check-button:checked')
  // const markers = $('.checked-button:checked')
  // .map(checkbox=> checkbox.val())
  // type= $['cafe','night_club', 'library', 'bar', 'school', 'park']
})

$('#allTypes').on('click',function(){
  for(var i=0; i<$('#allTypes').val().length;i++){
      search_types(map.getCenter(),$('#allTypes').val()[i]);
  }
});

// $('#allTypes').multiselect({
//   onChange: function(element, checked) {
//           var types = $('#allTypes option:selected');
//           $(types).each(function(index, value){
//               search_types(map.getCenter(),$(this).val());
//           });
//   }
// });

var geocoder = new google.maps.Geocoder();

        // var pyrmont = new google.maps.LatLng(20.268455824834792, 85.84099235520011);

        // var infowindow = new google.maps.InfoWindow();
        // // var waypoints = [];
        // function initialize() {
        //     map = new google.maps.Map(document.getElementById('map'), {
        //         mapTypeId: google.maps.MapTypeId.ROADMAP,
        //         center: pyrmont,
        //         zoom: 14
        //     });
        //     infowindow = new google.maps.InfoWindow();
        //     //document.getElementById('directionsPanel').innerHTML='';

        //    }

        // function createMarker(place,icon) {
        //     var placeLoc = place.geometry.location;
        //     var marker = new google.maps.Marker({
        //         map: map,
        //         position: place.geometry.location,
        //         icon: icon,
        //         visible:true

        //     });

        //     markersArray.push(marker);
        //     google.maps.event.addListener(marker, 'click', function() {
        //         infowindow.setContent("<b>Name:</b>"+place.name+"<br><b>Address:</b>"+place.vicinity+"<br><b>Reference:</b>"+place.reference+"<br><b>Rating:</b>"+place.rating+"<br><b>Id:</b>"+place.id);
        //         infowindow.open(map, this);
        //     });

        // }


        // var source="";
        // var dest='';

        function search_types(latLng, type){
            clearOverlays();

            if(!latLng){
                var latLng = pyrmont;
            }
            // var type = $('.case:checked').val();
            var icon = "images/"+type+".png";


            var request = {
                location: latLng,
                radius: 2000,
                types: ['cafe','night_club', 'library', 'bar', 'school', 'park'] //e.g. school, restaurant,bank,bar,city_hall,gym,night_club,park,zoo
            };

            var service = new google.maps.places.PlacesService(map);
            service.search(request, function(results, status) {
                map.setZoom(14);
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                        results[i].html_attributions='';
                        createMarker(results[i],icon);
                    }
                }
            });

         }


        // Deletes all markers in the array by removing references to them
        function clearOverlays() {
            if (markersArray) {
                for (i in markersArray) {
                    markersArray[i].setVisible(false)
                }
                //markersArray.length = 0;
            }
        }
        google.maps.event.addDomListener(window, 'load', initialize);

        function clearMarkers(){
            $('#show').show();
            $('#hide').hide();
            clearOverlays()
        }
        function showMarkers(){
            $('#hide').hide();
            $('#show').show();
            if (markersArray) {
                for (i in markersArray) {
                    markersArray[i].setVisible(true)
                }

            }
        }

        function showMap(){

            var imageUrl = 'http://chart.apis.google.com/chart?cht=mm&chs=24x32&chco=FFFFFF,008CFF,000000&ext=.png';
            var markerImage = new google.maps.MarkerImage(imageUrl,new google.maps.Size(24, 32));
            var input_addr=$('#address').val();
            geocoder.geocode({address: input_addr}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var latitude = results[0].geometry.location.lat();
                    var longitude = results[0].geometry.location.lng();
                    var latlng = new google.maps.LatLng(latitude, longitude);
                    if (results[0]) {
                        map.setZoom(14);
                        map.setCenter(latlng);
                        marker = new google.maps.Marker({
                            position: latlng,
                            map: map,
                            icon: markerImage,
                            draggable: true

                        });
                        $('#btn').hide();
                        $('#latitude,#longitude').show();
                        $('#address').val(results[0].formatted_address);
                        $('#latitude').val(marker.getPosition().lat());
                        $('#longitude').val(marker.getPosition().lng());
                        infowindow.setContent(results[0].formatted_address);
                        infowindow.open(map, marker);
                        search_types(marker.getPosition());
                        google.maps.event.addListener(marker, 'click', function() {
                            infowindow.open(map,marker);

                        });


                        google.maps.event.addListener(marker, 'dragend', function() {

                            geocoder.geocode({'latLng': marker.getPosition()}, function(results, status) {
                                if (status == google.maps.GeocoderStatus.OK) {
                                    if (results[0]) {
                                        $('#btn').hide();
                                        $('#latitude,#longitude').show();
                                        $('#address').val(results[0].formatted_address);
                                        $('#latitude').val(marker.getPosition().lat());
                                        $('#longitude').val(marker.getPosition().lng());
                                    }

                                    infowindow.setContent(results[0].formatted_address);
                                    var centralLatLng = marker.getPosition();
                                    search_types(centralLatLng);
                                    infowindow.open(map, marker);
                                }
                            });
                        });


                    } else {
                        alert("No results found");
                    }
                } else {
                    alert("Geocoder failed due to: " + status);
                }
            });

        }
