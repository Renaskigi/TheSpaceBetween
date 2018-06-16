
'use strict'

if (window.location.href.includes("resultPage")) {
  resultsInfo = JSON.parse(localStorage.getItem('results'));
  placeInfo = JSON.parse(localStorage.getItem('places'));
}

'use strict';

var url = window.location.href;
var updatedUrl = url.replace("mapPage", "resultPage");

$('#selections').submit(function(event) {
    console.log('clicked');
});
