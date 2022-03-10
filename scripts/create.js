//TODO Make document element references variables
const locationLabel = document.getElementById("locationlabel");
const inputLocation = document.getElementById("inputLocation");
const locationBtn = document.getElementById("#locationBtn");
const locationBtnLbl = document.getElementById("#locationbtnlbl");
/**changes the view to online */

function onlineSwitch() {

  /** changes the label to Link */
  locationLabel.innerHTML = "Link";

  /** changes the placeholder to Link */
  inputLocation.placeholder = "Link";

  /** changes the input type to url */
  inputLocation.type = 'url';

  /** changes the input pattern to url */
  inputLocation.setAttribute("pattern", "https://.*"); 

  /** clears the field  */
  inputLocation.setAttribute("value", ""); 

  locationBtn.setAttribute("onclick", "window.open('https://zoom.us/signin')"); 

  locationBtn.setAttribute("target", "_blank"); 

  locationBtnLbl.innerHTML = "Start a Video Call"; 

  locationBtn.innerHTML = "Start a Video Call"; 



}

/**changes the view to in person */

function inPersonSwitch() {

  /** changes the label to Location */
  locationLabel.innerHTML = "Location";

  /** changes the placeholder to Location */
  inputLocation.placeholder = "Location";

  /** changes the input type to text */
  inputLocation.type = 'text';

  /** changes the input pattern to no restrictions */
  inputLocation.removeAttribute("pattern"); 

  /** clears the field  */
  inputLocation.setAttribute("value", ""); 

  locationBtnLbl.innerHTML = "Use Your Location"; 

  locationBtn.innerHTML = "Get my location";
  
  locationBtn.setAttribute("onclick", "getLocation()"); 

}


/**displays your location in latitude and longitude coordinates, in the input field Location */

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    inputLocation.setAttribute("value", "Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  

  inputLocation.setAttribute("value", "Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);

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