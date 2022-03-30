const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
console.log(urlParams);
const eventId = urlParams.get('eventId');
console.log(eventId);
const commentID = db.collection("comments");

var currentUser;
var currentUserHostingEvent;
var eventDocument;
var userId;
var newDocId

function populateInfo() {
  firebase.auth().onAuthStateChanged(user => {
    // Check if user is signed in:
    if (user) {
      userId = user.uid;
      db.collection("events").doc(eventId).onSnapshot(doc => {
        eventDocument = doc;
        newDocId = doc.id;
        currentUserHostingEvent = db.collection("users").doc(user.uid).collection("hosting").doc(eventId);
        //get the document for current user's hosting event.
        currentUserHostingEvent.get()
          .then(userDoc => {
            // if the data fields are not empty, then write them in to the form.
            // var eventName = userDoc.data().eventName;
            showEventImage();
            var sport_type = userDoc.data().type;
            var event_name = userDoc.data().eventName;
            var start_date = userDoc.data().startDate;
            var end_date = userDoc.data().endDate;
            var start_time = userDoc.data().startTime;
            var end_time = userDoc.data().endTime;
            var event_owner = userDoc.data().owner;
            var event_location = userDoc.data().location;
            var event_description = userDoc.data().description;
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
            }
            if (event_location != null) {
              document.getElementById("location").value = event_location;
            }
            if (event_description != null) {
              document.getElementById("description").value = event_description;
            }

          })
      })
      db.collection("users").doc(user.uid).onSnapshot(doc => {
        currentUser = db.collection("users").doc(user.uid);
        document.querySelector("#like").onclick = () => saveLikedEvent(eventId);
      });

    } else {
      // No user is signed in.
      console.log("No user is signed in");
    }
  });
}

//Render the image associated with the event ID.
function showEventImage() {
  firebase.storage().ref('images/' + eventId).getDownloadURL()
    .then(imgUrl => {
      document.querySelector('.card-img-top').src = imgUrl;
      console.log(imgUrl);
    }).catch((error) => {
      console.log("No image found ", error);
  });
}

//call the function to run it 
populateInfo();

function editEventInfo() {
  //Enable the form fields
  document.getElementById('eventInfoFields').disabled = false;
}

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

//Enable the form fields
function writeComments() {
  document.getElementById('comment-section').disabled = false;
  document.getElementById('cmtsbtn').innerHTML = "Post";

  // document.getElementById('cmtsbtn').setAttribute("onclick", "");
  document.getElementById('cmtsbtn').setAttribute("onclick", "postComment()");
  console.log("This button works")

}

var comments;
var commentId;

function postComment() {
  console.log("This button works too")

  db.collection('events').doc(eventId).collection("comments").doc().set({

      comment_text: document.getElementById("comment").value,
      userId: sessionStorage.getItem('userId'),
      userName: sessionStorage.getItem('userName')
    }).then(function () {
      console.log("Comment has been posted. ");
      location.reload();
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}


function populateComments() {
  let commentCardTemplate = document.getElementById("commentTemplate");
  let commentCardGroup = document.getElementById("commentCardGroup");

  db.collection("events").doc(eventId).collection("comments").get()
    .then(snap => {
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



function writeEvents() {
  //define a variable for the collection you want to create in Firestore to populate data
  //var EventRef = db.collection('users').doc(userId).collection("hosting").doc(newDocId);
  //console.log("new Doc idea function", newDocId);
  db.collection('users').doc(userId).collection(collect).doc(newDocId).set(userDoc.data())
  .then(function (docRef2) {
    console.log("Second Document written with ID: ");
    console.log(docRef2);
  })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}