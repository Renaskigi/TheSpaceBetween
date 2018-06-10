//if menu clicked, X will show so user knows to exit menu
// $('.icon-menu').on('click', function(event) {
//   $('.icon-menu').toggleClass('icon-cross');
// })
const API_KEY = 'AIzaSyD1rQRJPfneZQWdf0GsAqcjo_iv60b1J48';
const address = {};

$('#address').submit(function(event) {
    event.preventDefault();
    address.first = $('#addr-first').val();
    address.second = $('#addr-second').val();
    console.log(address.first);
    console.log(address.second);
});

console.log(address.first);

function getCoordinates () {
    $.ajax({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address.first}&key=${API_KEY}`,
        type: 'GET'
    })
    .then(data =>address.firstCoordinates = data.results[0].geometry.location,
          err => console.log(err))
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