//check if there is a user logged in
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    getLikedEvents(user);
  } else {
    console.log("No user is signed in");
  }
});

//gets the current user's favorite events.
function getLikedEvents(user) {
  db.collection("users").doc(user.uid).collection("likedEvents").get()
    .then((querySnapshot) => {
      console.log(user.uid);
      querySnapshot.forEach((doc) => {
        console.log(doc.data().eventId);
        thisEventId = doc.data().eventId;
        let CardTemplate = document.getElementById("CardTemplate");
        db.collection("events").where(firebase.firestore.FieldPath.documentId(), "==", thisEventId).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.data());
            var eventName = doc.data().eventName; //gets the event name
            var type = doc.data().type; //gets the sport type
            var time = doc.data().startTime; //gets the start time
            var date = doc.data().startDate; //gets the event date
            var description = doc.data().description; //gets the event description
            var location = doc.data().location;
            let newCard = CardTemplate.content.cloneNode(true);
            //populate the template with this event's info
            newCard.querySelector('.card-title').innerHTML = eventName;
            newCard.querySelector('.card-type').innerHTML = type;
            newCard.querySelector('.card-location').innerHTML = location;
            newCard.querySelector('.card-startTime').innerHTML = time;
            newCard.querySelector('.card-startDate').innerHTML = date;
            newCard.querySelector('.card-text').innerHTML = description;
            eventCardGroup.appendChild(newCard);
          })
        });
      })
    })
}