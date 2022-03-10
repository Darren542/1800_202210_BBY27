//TODO Make document element references variables
const locationLabel = document.getElementById("locationlabel");
const inputLocation = document.getElementById("inputLocation");
const locationBtn = document.getElementById("#locationBtn");
const locationBtnLbl = document.getElementById("#locationbtnlbl");
/**changes the view to online */

function onlineSwitch() {

  /** changes the label to Link */
  document.getElementById("locationlabel").innerHTML = "Link";

  /** changes the placeholder to Link */
  document.getElementById("inputLocation").placeholder = "Link";

  /** changes the input type to url */
  document.getElementById('inputLocation').type = 'url';

  /** changes the input pattern to url */
  document.getElementById("inputLocation").setAttribute("pattern", "https://.*"); 

  /** clears the field  */
  document.getElementById("inputLocation").setAttribute("value", ""); 

  document.getElementById("locationBtn").setAttribute("onclick", "window.open('https://zoom.us/signin')"); 

  document.getElementById("locationBtn").setAttribute("target", "_blank"); 

  document.getElementById("locationbtnlbl").innerHTML = "Start a Video Call"; 

  document.getElementById("locationBtn").innerHTML = "Start a Video Call"; 



}

/**changes the view to in person */

function inPersonSwitch() {

  /** changes the label to Location */
  document.getElementById("locationlabel").innerHTML = "Location";

  /** changes the placeholder to Location */
  document.getElementById("inputLocation").placeholder = "Location";

  /** changes the input type to text */
  document.getElementById('inputLocation').type = 'text';

  /** changes the input pattern to no restrictions */
  document.getElementById("inputLocation").removeAttribute("pattern"); 

  /** clears the field  */
  document.getElementById("inputLocation").setAttribute("value", ""); 

  document.getElementById("locationbtnlbl").innerHTML = "Use Your Location"; 

  document.getElementById("locationBtn").innerHTML = "Get my location";
  
  document.getElementById("locationBtn").setAttribute("onclick", "getLocation()"); 

}


/**displays your location in latitude and longitude coordinates, in the input field Location */

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    document.getElementById("inputLocation").setAttribute("value", "Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  

  document.getElementById("inputLocation").setAttribute("value", "Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);

}

// Code to write event to database

//code to get information entered
  // descVar = element.reference.value
// function writeEvents() {
    //define a variable for the collection you want to create in Firestore to populate data
//    var EventRef = db.collection("events");

//     EventRef.add({
//         description: descVar,
//         endTime: DateVar,
//         eventName: eventVar,
//         owner: user.uid, firebase.auth().onAuthStateChanged(user => {
//                                userId = user.uid;
//                                console.log(userId);
//                            });
//         postalCode: "V7E-2T9",
//         province: "BC",
//         startDate: DateVar,
//         streetAddress: "4-4051 Garry St",
//         type: "Hockey" 
//     });
// }