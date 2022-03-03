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
         document.querySelector("#event-description").innerHTML = doc.data().description;
         document.querySelector("#test2").innerHTML = "test text";
    })
}
read_events_info();

