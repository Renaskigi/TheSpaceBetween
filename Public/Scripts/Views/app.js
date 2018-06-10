'use strict';


function apiKeyLoader() {
    const config = config.api_key;
    $('#api-key').attr("src","https://maps.googleapis.com/maps/api/js?key=" + config + "&callback=initMap");
    $('#api-libraries').attr("src","https://maps.googleapis.com/maps/api/js?key=" + config + "&libraries=geometry,places");
}
