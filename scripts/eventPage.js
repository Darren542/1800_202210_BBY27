const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
console.log(urlParams);
const eventId = urlParams.get('eventId');
console.log(eventId);

var currentUser;
var currentUserHostingEvent;

function populateInfo() {
  firebase.auth().onAuthStateChanged(user => {
    // Check if user is signed in:
    if (user) {
      db.collection("events").doc(eventId).onSnapshot(doc => {
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
  document.getElementById('cmtsbtn').setAttribute("onclick", "");
  document.getElementById('cmtsbtn').setAttribute("onclick", "postComment()");
}

var comments;
var commentId;

function postComment() {
  comment_text = document.getElementById("comment").value;
  userId = sessionStorage.getItem('userId');
  userName = sessionStorage.getItem('userName');


  //reference the comment map and assign it to a variable
  //get the comment map size (an object that represents each comment)
  //reference the comment map size + 1 and assign it to a variable (represents a new comment object)
  //write the new comment object with, comment_text, userID, and UserName as states of the comment object's attributes.

  //add a new comment div above the comment box

  document.getElementById('comment-section').disabled = true;

}

function postComment2() {
  db.collection('events').doc(eventId).collection("comments").doc().set({
      // comment_text : document.getElementById("comment").value,
      // userId : sessionStorage.getItem('userId'),
      // userName : sessionStorage.getItem('userName')

      comment_text: "testCommentText",
      userId: "testUserID",
      userName: "testUserName"

    }).then(function (docRef2) {
      console.log("Second Document written with ID: ");
      console.log(docRef2);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}





function populateComments() {
  let commentCardTemplate = document.getElementById("commentTemplate");
  let commentCardGroup = document.getElementById("commentCardGroup");

  db.collection("events").doc(eventId).get()
    .then(allComments => {
      allComments.forEach(doc => {
        var comment_content = doc.data().name;
        var userName = doc.data().id;
        let testCommentCard = hikeCardTemplate.content.cloneNode(true);
        testCommentCard.querySelector('.comment-content').innerHTML = comment_content;
        testCommentCard.querySelector('.comment-author').innerHTML = userName;
        commentCardGroup.appendChild(testCommentCard);
      })

    })
}
populateComments();