/**displays your location in latitude and longitude coordinates, in the input field Location */

var x = document.getElementById("inputLocation");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.value = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {

  x.value = "Latitude: " + position.coords.latitude + 
  " Longitude: " + position.coords.longitude;
}

