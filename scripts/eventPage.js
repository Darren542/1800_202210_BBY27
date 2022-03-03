function read_events_info() {
  db.collection("events").doc("TeL6VGcmj5kW9QAl5pGx")                                                      
    .onSnapshot(doc => {                                                               
         console.log("current document data: " + doc.data());                          
         document.getElementById("event-description").innerHTML = doc.data().description;      
    })
}
read_events_info();

