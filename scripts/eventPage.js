//------------------------------------------------------------------
// get params from the URL so they appropriate results can be shown.
//------------------------------------------------------------------
const queryString = window.location.search;
//console.log(queryString);
const urlParams = new URLSearchParams(queryString);
//console.log(urlParams);
const eventId = urlParams.get('eventId');
//console.log(eventId);
const commentID = db.collection("comments");

var currentUser;
var currentUserHostingEvent;
var eventDocument;
var userId;
var newDocId;
var EventOwnerName;
var EventOwnerId;

//----------------------------------------------------------------
// Displays all the events Information on the webpage.
// The event to be displayed is choosen from the param in the url
//----------------------------------------------------------------
function populateInfo() {
  firebase.auth().onAuthStateChanged(user => {
    // Check if user is signed in:
    if (user) {
      userId = user.uid;
      db.collection("events").doc(eventId).onSnapshot(doc => {
        eventDocument = doc;
        newDocId = doc.id;
        console.log("userid", user.id);
        currentUserHostingEvent = db.collection("events").doc(eventId);
        //get the document for current user's hosting event.
        currentUserHostingEvent.get()
          .then(userDoc => {
            // if the data fields are not empty, then write them in to the form.
            // var eventName = userDoc.data().eventName;
            showEventImage(userDoc.data().type);
            var sport_type = userDoc.data().type;
            var event_name = userDoc.data().eventName;
            var start_date = userDoc.data().startDate;
            var end_date = userDoc.data().endDate;
            var start_time = userDoc.data().startTime;
            var end_time = userDoc.data().endTime;
            var event_owner = userDoc.data().owner;
            var event_location = userDoc.data().location;
            var event_description = userDoc.data().description;
            EventOwnerId = userDoc.data().ownerId;
            // Show edit options if you are event owner.
            if (EventOwnerId == userId) {
              displayEdit();
            }
            if (event_name != null) {
              document.getElementById("event").value = event_name;
            }
            if (sport_type != null) {
              document.getElementById("type").value = sport_type;
            }
            if (start_date != null) {
              document.getElementById("start-date").value = start_date;
            }
            if (end_date != null) {
              document.getElementById("end-date").value = end_date;
            }
            if (start_time != null) {
              document.getElementById("start-time").value = start_time;
            }
            if (end_time != null) {
              document.getElementById("end-time").value = end_time;
            }
            if (event_owner != null) {
              document.getElementById("owner").value = event_owner;
              EventOwnerName = event_owner
            }
            if (event_location != null) {
              document.getElementById("location").value = event_location;
            }
            if (event_description != null) {
              document.getElementById("description").value = event_description;
              document.getElementById("description2").innerHTML = event_description;
            }
            displayHost();
            displayAttendees();
          })
      })
      // Old code for like button
      // db.collection("users").doc(user.uid).onSnapshot(doc => {
      //   currentUser = db.collection("users").doc(user.uid);
      //   document.querySelector("#like").onclick = () => saveLikedEvent(eventId);
      // });

    } else {
      // No user is signed in.
      console.log("No user is signed in");
    }
  });
}

//-----------------------------------------------------------
// Render the image associated with the event ID.
// Default image for event type is used if not event Image
// If event has an Image that is displayed.
//-----------------------------------------------------------
function showEventImage(type) {
  firebase.storage().ref('images/' + eventId).getDownloadURL()
    .then(imgUrl => {
      document.querySelector('.card-img-top').src = imgUrl;
      console.log(imgUrl);
    }).catch((error) => {
      document.querySelector('.card-img-top').src = "./images/" + type + ".webp";
      console.log("No image found ", error);
    });
}

//call the function to run it 
populateInfo();

//-----------------------------------------------------------------
// Makes the fields on the page editable
// This should only be allowed for the event owner.
//-----------------------------------------------------------------
function editEventInfo() {
  //Enable the form fields
  document.getElementById('eventInfoFields').disabled = false;
}

//------------------------------------------------------------------
// Saves the changes made to the event by the owner.
// Should not be run if event is not owned by user.
//------------------------------------------------------------------
function saveEventInfo() {
  event_name = document.getElementById("event").value;
  sport_type = document.getElementById("type").value;
  start_date = document.getElementById("start-date").value;
  end_date = document.getElementById("end-date").value;
  start_time = document.getElementById("start-time").value;
  end_time = document.getElementById("end-time").value;
  event_owner = document.getElementById("owner").value;
  event_location = document.getElementById("location").value;
  event_description = document.getElementById("description").value;
  currentUserHostingEvent.update({
    eventName: event_name,
    type: sport_type,
    startDate: start_date,
    endDate: end_date,
    startTime: start_time,
    endTime: end_time,
    owner: event_owner,
    location: event_location,
    description: event_description
  }).then(() => {
    console.log("Event info successfully updated!");
  });
  document.getElementById('eventInfoFields').disabled = true;
}

//-----------------------------------------------------------------------------
// This function is called whenever the user clicks on the "bookmark" icon.
// It adds the event to the "like" array
// Then it will change the bookmark icon from the hollow to the solid version. 
//-----------------------------------------------------------------------------
function saveLikedEvent(eventId) {
  currentUser.collection("likedEvents").doc(eventId).set({
    eventId: eventId
  }, {
    merge: true
  })
    .then(function () {
      console.log("Liked event has been saved!");
      document.getElementById("like").className = 'fa-solid fa-thumbs-up fa-xl';
    });
}

//-------------------------------------------------------------------------------
// Enable the form fields.
// Needs to run to allow user access to fields to post comments.
//-------------------------------------------------------------------------------
function writeComments() {
  document.getElementById('comment-section').disabled = false;
  document.getElementById('cmtsbtn').innerHTML = "Post";
  document.getElementById('cmtsbtn').setAttribute("onclick", "");
  document.getElementById('cmtsbtn').setAttribute("onclick", "postComment()");
  console.log("This button works")

}

var comments;
var commentId;
//-----------------------------------------------------------------------
// Posts a comment into the database.
// reloads page afterwords so that comment can be seen.
//-----------------------------------------------------------------------
function postComment() {
  console.log("This button works too")

  db.collection('events').doc(eventId).collection("comments").doc().set({
    comment_text: document.getElementById("comment").value,
    userId: sessionStorage.getItem('userId'),
    userName: sessionStorage.getItem('userName'),
    timeStamp: Date.now()
  }).then(function () {
    console.log("Comment has been posted. ");
    location.reload();
  })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}

//-----------------------------------------------------------------------------
// Displays all the event's comments on the page.
// Creates then appends a card for each comment found.
//-----------------------------------------------------------------------------
function populateComments() {
  let commentCardTemplate = document.getElementById("commentTemplate");
  let commentCardGroup = document.getElementById("commentCardGroup");

  db.collection("events").doc(eventId).collection("comments").get()
    .then(snap => {
      console.log("snapLength", snap.length);
      snap.forEach(doc => {
        var comment_body = doc.data().comment_text;
        var userName = doc.data().userName;
        let testCommentCard = commentCardTemplate.content.cloneNode(true);
        testCommentCard.querySelector('.comment-author').innerHTML = userName;
        testCommentCard.querySelector('.comment-content').innerHTML = comment_body;
        commentCardGroup.appendChild(testCommentCard);
        // })
        console.log("Comment is viewable");
      });
    });
  // })
}
populateComments();


//--------------------------------------------------------------------------------------
// When a user clicks to attend or like an event a copy is saved in their account.
// Information about the user who clicked attend or like is also saved in the events
// document in its own collection.
//--------------------------------------------------------------------------------------
function writeEvents(userDoc, collect) {
  //console.log("new Doc idea function", newDocId);
  // Saves the event into the users document in the right collection.
  db.collection('users').doc(userId).collection(collect).doc(newDocId).set(userDoc.data())
    .then(function (docRef2) {
      console.log("Second Document written with ID: ");
      console.log(docRef2);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });

  // Saves the information about the user attending or liking the event.
  db.collection('events').doc(eventId).collection(collect).doc(userId).set({
    userId: sessionStorage.getItem('userId'),
    userName: sessionStorage.getItem('userName'),
    timeStamp: Date.now()
  }).then(function () {
    console.log("Comment has been posted. ");
  })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });

  // Changes the display to show that event was liked.
  if (collect == "liked") {
    console.log("eventLiked", collect)
    document.getElementById("liked").className = 'bi bi-heart-fill';
    document.getElementById("liked").innerHTML = 'Liked';
    document.getElementById("likedDiv").className = 'btn btn-success';
  }

  // Changes the display to show event is attended.
  if (collect == "attending") {
    console.log("eventAttended", collect)
    console.log(document.getElementById("attending"));
    document.getElementById("attending").className = 'btn btn-success';
    document.getElementById("attending").innerHTML = 'Successfully Joined';
  }
  //console.log("how many times am i running");
}

//----------------------------------------------------------------------
// Function to display the current host on page.
// Uses default image if they have no image in firestore.
//----------------------------------------------------------------------
function displayHost() {
  console.log('EventOwnerId', EventOwnerId);
  firebase.storage().ref('users/' + EventOwnerId + '/profile.png').getDownloadURL().then(imgUrl => {
    document.getElementById("ownerFrame").src = imgUrl;
    console.log("imgUrl", imgUrl);
  }).catch(() => {
    console.log("no profile image found");
    document.getElementById("ownerFrame").src = './images/profile.png';
  });
  document.getElementById("ownerName").innerHTML = EventOwnerName;
}

//----------------------------------------------------------------------
// Function to display the events attendees
//----------------------------------------------------------------------
function displayAttendees() {
  let template = document.getElementById("attendeeTemplate");
  var i = 0;
  db.collection("events").doc(newDocId).collection("attending").get().then(function (snap) {
    snap.forEach(doc => {
      let newName = doc.data().userName;
      let newUserId = doc.data().userId;
      console.log("newUserId", newUserId);
      var newCard = template.content.cloneNode(true);
      newCard.querySelector(".attendeeName").innerHTML = newName;
      newCard.querySelector('.attendeeFrame').setAttribute("id", newUserId);
      displayAttendeeImage(newUserId);
      document.getElementById("attendee").appendChild(newCard);
      i++;
    })
  });
}

//----------------------------------------------------------------------------
// Gets image of an attendee of the event.
// The parameter is the Id of the user in the firebase database
// If no image exists then a default image is used.
//----------------------------------------------------------------------------
function displayAttendeeImage(userId) {
  //console.log("userID", userId);
  firebase.storage().ref('users/' + userId + '/profile.png').getDownloadURL().then(imgUrl => {
    document.getElementById(userId).src = imgUrl;
    //console.log("imgUrl", imgUrl);
  }).catch(() => {
    document.getElementById(userId).src = './images/profile.png';
    console.log("no profile image found");
  });
}

// Prevents users who are not event owner from seeing these options.
function displayEdit() {
  document.querySelector("#editButton").classList.remove('hidden');
  document.querySelector("#saveButton").classList.remove('hidden');
}