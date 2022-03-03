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
      var time = doc.data().startDate;   // get value of the "details" key
      var time = time.toDate();
      var eventID = doc.id;
      console.log(eventID);
      time = time.toString();
      time = time.slice(0, 24);
      console.log(doc.data().startTime);
      document.querySelector("#start-time").innerHTML = time;
      time = doc.data().endDate;   // get value of the "details" key
      time = time.toDate();
      console.log(eventID);
      time = time.toString();
      time = time.slice(0, 24);
      console.log(doc.data().endTime);
      document.querySelector("#end-time").innerHTML = time;
      console.log(doc.data().owner);
      document.querySelector("#owner").innerHTML = doc.data().owner;
      console.log(doc.data().streetAddress);
      document.querySelector("#address").innerHTML = doc.data().streetAddress;
      
      console.log(doc.data().type);
    })
}
read_events_info();