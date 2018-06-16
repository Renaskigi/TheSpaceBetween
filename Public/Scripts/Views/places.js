'use strict'

if (window.location.href.includes("resultPage")) {
  resultsInfo = JSON.parse(localStorage.getItem('results'));
  placeInfo = JSON.parse(localStorage.getItem('places'));
}
