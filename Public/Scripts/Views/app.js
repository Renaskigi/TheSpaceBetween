'use strict';
function apiKeyLoader() {
        $('#api-key').attr("src","https://maps.googleapis.com/maps/api/js?key=" + config + "&callback=initMap");
}