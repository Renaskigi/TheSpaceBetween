
// const API_KEY = 'AIzaSyC9RhI2XAtoSBUZXkxnbHrhojb2rhuufmM';
// function getPlaces () {
//     $.ajax({
//         url: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&callback=initMap`,
//         type: 'GET'
//     })
//     .then(data => { 
//       console.log('placesDATA', data);
//     })
// }

// function callback(results, status) {
//     console.log('results', results)
//     if (status === google.maps.places.PlacesServiceStatus.OK) {
//       for (var i = 0; i < results.length; i++) {
//         createMarker(results[i]);
//       }
//     }
//   }

//   function createMarker(place) {
//       var placeLoc =  {lat:place.geometry.location.lat(),lng:place.geometry.location.lng()}
//       console.log('place', placeLoc);
//     // var marker = new google.maps.Marker({
//     //   map: map,
//     //   position: placeLoc
//     // });

//     var marker = new google.maps.Marker({
//         position : placeLoc,
//         setMap : map
//     }); 

//     google.maps.event.addListener(marker, 'click', function() {
//       infowindow.setContent(place.name);
//       infowindow.open(map, this);
//     });
//   }