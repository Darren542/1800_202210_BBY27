// make create form save into database
document.querySelector("#submit-button").addEventListener("click", () => {
  //save the document to be created into database
  saveDocument();
});

// Data to be saved into database
var online = false;
var userId;
var userName;

//-------------------------------------------------------
// switches from in person view to online view
//-------------------------------------------------------
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

  //track which page user on
  online = true;

}

//-------------------------------------------------------
// switches from online view to in person view
//-------------------------------------------------------
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
  //track which page user on
  online = false;
}

//-------------------------------------------------------
// displays your location in latitude and longitude coordinates, in the input field Location
//-------------------------------------------------------
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    document.getElementById("inputLocation").setAttribute("value", "Geolocation is not supported by this browser.");
  }
}

//-------------------------------------------------------
// fills in location spot with your current coords.
//-------------------------------------------------------
function showPosition(position) {
  document.getElementById("inputLocation").setAttribute("value", "Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);
}

// Gobal variables so that multiple function can use them
var newDocId;
var eventName;
var eventDesc;
var inputSportVar;
var locationValue;
var startDate;
var startTime;
var timeStampStart;
var endDate;
var endTime;
var timeStampEnd;
var userId;
var EventRef;
var city;

// Code to write event to database

//-------------------------------------------------------------------------
// Saves the newly created event into the event collection in.
// the firebase database.
// calls function to try to upload image to firebase storage.
// calls the function to save into logged in users hosting collection after.
//--------------------------------------------------------------------------
function saveDocument() {
  eventName = inputEventName.value;
  eventDesc = document.querySelector("#descriptionBox").value;
  inputSportVar = inputSport.value;
  locationValue = document.querySelector("#inputLocation").value;
  startDate = document.querySelector("#inputStartDate").value;
  startTime = document.querySelector("#inputStartTime").value;
  timeStampStart = document.querySelector("#inputStartTime").valueAsNumber + document.querySelector("#inputStartDate").valueAsNumber;
  endDate = document.querySelector("#inputEndDate").value;
  endTime = document.querySelector("#inputEndTime").value;
  timeStampEnd = document.querySelector("#inputEndTime").valueAsNumber + document.querySelector("#inputEndDate").valueAsNumber;
  console.log('eventName', eventName, eventDesc, inputSportVar, locationValue, startDate, startTime, timeStampStart);
  console.log("userDetails", sessionStorage.getItem('userId'));
  userId = sessionStorage.getItem('userId');
  EventRef = db.collection("events");
  city = document.querySelector("#inputCity").value;

  EventRef.add({
    description: eventDesc,
    endTime: endTime,
    endDate: endDate,
    timeStampEnd: timeStampEnd,
    startTime: startTime,
    startDate: startDate,
    timeStampStart: timeStampStart,
    eventName: eventName,
    owner: sessionStorage.getItem('userName'),
    ownerId: userId,
    postalCode: 'unused',
    province: "unused",
    streetAddress: "unused",
    type: inputSportVar,
    location: locationValue,
    creationTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
    online: online,
    city: city

  }).then(function (docRef) {
    console.log("First Document written with ID: ", docRef.id);
    console.log(docRef);
    newDocId = docRef.id;
    console.log("newDocId", newDocId);
    uploadImage();
    writeEvents();

  })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}

//----------------------------------------------------------------------------------
// code to get information entered into users collection in the firebase database.
// After this runs they get redirected to the new events page.
//----------------------------------------------------------------------------------
function writeEvents() {
  //define a variable for the collection you want to create in Firestore to populate data
  //var EventRef = db.collection('users').doc(userId).collection("hosting").doc(newDocId);
  //console.log("new Doc idea function", newDocId);
  db.collection('users').doc(userId).collection("hosting").doc(newDocId).set({
    ownerId: userId,
    description: eventDesc,
    endTime: endTime,
    endDate: endDate,
    timeStampEnd: timeStampEnd,
    startTime: startTime,
    startDate: startDate,
    timeStampStart: timeStampStart,
    eventName: eventName,
    owner: sessionStorage.getItem('userName'),
    ownerId: sessionStorage.getItem('userId'),
    postalCode: 'unused',
    province: "unused",
    streetAddress: "unused",
    type: inputSportVar,
    location: locationValue,
    creationTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
    online: online,
    city: city

  }).then(function (docRef2) {
    console.log("Second Document written with ID: ");
    console.log(docRef2);
    window.location.assign(`eventPage.html?eventId=${newDocId}`);
  })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}

//--------------------------------------------------------------------------
// Uploads the user selected image to the firebase storage.
// If the do not select an image nothing happens.
// The event will load in with a the default image for it's sport type.
//---------------------------------------------------------------------------
function uploadImage() {
  //get reference to file input
  var file = document.querySelector('input[type=file]').files[0];
  //console.log("file", file);
  // create a file object of the file sellect by user
  // only have it for pngs atm
  // read the file in not sure if this is needed, but can be used to display preview of image if we want
  var reader = new FileReader;

  try {
    reader.readAsDataURL(file);
    console.log("image loaded");
    // get a reference to firebases storage
    var storageRef = firebase.storage().ref();
    // get a reference to where image will be stored
    var testImagesRef = storageRef.child(`images/${newDocId}`);
    // write the image into storage
    testImagesRef.put(file).then((snapshot) => {
      console.log('Uploaded an Image!');
    });
  }
  catch (err) {
    console.log("no image loaded");
  }
  //console.log("file", file);
  //setTimeout(function() { console.log("file", file); }, 500);
}

