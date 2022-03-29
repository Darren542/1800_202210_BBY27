//check if there is a user logged in
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    getLikedEvents(user);
  } else {
    console.log("No user is signed in");
  }
});
var thisEventId;
//gets the current user's favorite events.
function getLikedEvents(user) {
  db.collection("users").doc(user.uid).collection("likedEvents").get()
    .then((querySnapshot) => {
      console.log(user.uid);
      querySnapshot.forEach((doc) => {
        thisEventId = doc.data().eventId;
        console.log(thisEventId);
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
            newCard.querySelector('.card').setAttribute('id', thisEventId);
            console.log("Card id: ",newCard.querySelector('.card').id);
            eventCardGroup.appendChild(newCard);
          })
        }).then(snap => {
          /* If there is an image for the event stored in firebase use it.
           * if there is no image use the default image for that event type */
          let allCards = document.querySelectorAll(".card");
          
          allCards.forEach(element =>{
              console.log("card", element.id);
              let elementId = element.id
              firebase.storage().ref('images/' + elementId).getDownloadURL()
           .then(imgUrl => {
               element.src = imgUrl;
               element.querySelector('.card-image').src = imgUrl;
               console.log("element", element);
               console.log("imgUrl", imgUrl);
           })
           .catch((error) => {
               console.log("No image found ", error);
           });
          });
      });
      })
    })
}