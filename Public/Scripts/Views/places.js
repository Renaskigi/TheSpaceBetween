'use strict';

var url = window.location.href;
var updatedUrl = url.replace("mapPage?", "resultPage.html");

$('#selections').submit(function(event) {
    window.location = updatedUrl;
});