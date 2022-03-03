function read_events_info() {
  db.collection("events").doc("TeL6VGcmj5kW9QAl5pGx")                                                      
    .onSnapshot(doc => {                                                               
         console.log("current document data: " + doc.data());
         console.log(doc.data().description);                       
         document.querySelector("#event-description").innerHTML = doc.data().description;
         document.querySelector("#test2").innerHTML = "test text";
    })
}
read_events_info();

