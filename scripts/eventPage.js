const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
console.log(urlParams);
const eventId = urlParams.get('eventId');

function read_events_info() {
  db.collection("events").doc(eventId)
    .onSnapshot(doc => {
      console.log("current document data: " + doc.data());
      console.log(doc.data().description);
      document.querySelector("#description").innerHTML = doc.data().description;
      console.log(doc.data().eventName);
      document.querySelector("#event").innerHTML = doc.data().eventName;
      console.log(doc.data().type);
      document.querySelector("#type").innerHTML = doc.data().type;
      document.querySelector("#start-date").innerHTML = doc.data().startDate;
      document.querySelector("#end-date").innerHTML = doc.data().endDate;
      document.querySelector("#start-time").innerHTML = doc.data().startTime;
      document.querySelector("#end-time").innerHTML = doc.data().endTime;
      document.querySelector("#owner").innerHTML = doc.data().owner;
      document.querySelector("#location").innerHTML = doc.data().location;
    })
}
read_events_info();