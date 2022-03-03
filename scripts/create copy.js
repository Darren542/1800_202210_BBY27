
/**displays your location in latitude and longitude coordinates, in the input field Location */

let x = document.querySelector("#inputLocation2");
const inputLocation = document.getElementsByClassName('test5');
console.log(inputLocation);
console.log(x);

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    inputLocation[0].value = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  console.log(position);
  inputLocation[0].placeholder = "Latitude: " + position.coords.latitude + 
  " Longitude: " + position.coords.longitude;
}


