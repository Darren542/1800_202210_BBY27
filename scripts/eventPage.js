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
         console.log(doc.data().startTime);                       
         document.querySelector("#start-time").innerHTML = doc.data().startTime;
         console.log(doc.data().endTime);                       
         document.querySelector("#end-time").innerHTML = doc.data().endTime;
         console.log(doc.data().owner);                       
         document.querySelector("#owner").innerHTML = doc.data().owner;
         console.log(doc.data().streetAddress);                       
         document.querySelector("#address").innerHTML = doc.data().streetAddress;
         document.querySelector("#test2").innerHTML = "test text";
    })
}
read_events_info();

