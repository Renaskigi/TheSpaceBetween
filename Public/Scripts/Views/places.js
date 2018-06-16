
'use strict'

if (window.location.href.includes("resultPage")) {
  var resultsInfo = JSON.parse(localStorage.getItem('results'));
  var placeInfo = JSON.parse(localStorage.getItem('places'));
}


// var newurl = window.location.href;
// var newupdatedUrl = newurl.replace("mapPage", "resultPage");
// // $('#selections').submit(function(event) {
// //     console.log('clicked');
// // });
//
// $( "#selections" ).click(function() {
//   window.location = newupdatedUrl;
// });
//
// document.getElementById("selections").onclick = function () {
//     location.href = "resultPage.html";
//   }
