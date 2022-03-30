//get the params from the url bar
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

//get the category from params
let category = "nothing";
let catSym = "!=";
let catSearch = false;
if (urlParams.get('categoryToggle')) {
    category = urlParams.get('categories');
    catSym = "==";
    catSearch = true;
} 

//get the location from params
let locationId = "nothing"
let locationSearch = false;
if (urlParams.get('locationToggle')) {
    locationId = urlParams.get('locations');
    locationSearch = true;
} 
console.log("the city", locationId);

//get the distance from user
//TODO no code here yet

//get the start and end date user wants
//TODO no code here yet

//testing searchs on database
// db.collection('events').where('type', '==', 'Hockey').get().then(test87 =>{
//     test87.forEach(doc => {
//         console.log('test77', doc.data());
//     })
    
// });

 /* ------------------------------------------------------------------------
    * Displays the cards on the pages body
    * Cards that are displayed are choosen from the search parameters picked
    ------------------------------------------------------------------------*/
function displayCards(collection) {
    let cardTemplate = document.getElementById("eventCardTemplate2");

    /* ****************************************************************
    * Search parameters change depending on the params in the url
    *  You can't do multiple queries in one search if they are not '=='
    ******************************************************************/
    if (catSearch && locationSearch) {
        db.collection(collection).where('type', "==", category).where('city' , '==', locationId).limit(3).get().then(function(snap) {
            displayCards(snap);
            displayImages(snap);
        })
    } else if (catSearch) {
        db.collection(collection).where('type', "==", category).limit(3).get().then(function(snap) {
            displayCards(snap);
            displayImages(snap);
        });
    } else if (locationSearch) {
        db.collection(collection).where('city' , '==', locationId).limit(3).get().then(function(snap) {
            displayCards(snap);
            displayImages(snap);
        });
    } else {
        db.collection(collection).limit(3).get().then(function(snap) {
            displayCards(snap);
            displayImages(snap);
        })
    }

function displayCards(snap) {
    var i = 1;
            
            snap.forEach(doc => { //iterate thru each doc
                var eventName = doc.data().eventName;   // get value of the "name" key
                var description = doc.data().description;   // get value of the "details" key
                var type = doc.data().type;   // get value of the "details" key
                var time = doc.data().startDate;   // get value of the "details" key
                //var time = time.toDate();
                var startTime = doc.data().startTime;
                if (!startTime) {
                    startTime = "no start time";
                }
                var eventID = doc.id;
                console.log(eventID);
                time = time.toString();
                time = time.slice(0, 24);
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = eventName;
                //newcard.querySelector('.card-title').href = "./eventPage.html?eventId=" + eventID;
                newcard.querySelector('.card-text').innerHTML = description;
                newcard.querySelector('.card-date').innerHTML = time;
                newcard.querySelector('.card-time').innerHTML = startTime;

                //-----------------------------------------------------------------------
                // Checks the events start and end timeStamp againts the current time.
                // Displays the time until the event starts if event has not started yet.
                // If event is ongoing displays that event is ongoinging.
                // If event has ended displays that event has ended.
                //-----------------------------------------------------------------------
                var timeUntilStart = doc.data().timeStampStart - Date.now();
                var timeUntilEnd = doc.data().timeStampEnd - Date.now();
                // console.log("Time until start", timeUntilStart);
                if (timeUntilStart > 0){
                    var secondsTotal = timeUntilStart / 1000; // convert ms to seconds
                    var daysTotal = Math.floor(secondsTotal / 86400); // seconds in a day
                    var hoursTotal = Math.floor(secondsTotal / 3600) % 24; // seconds in an hour
                    var minutesTotal = Math.floor(secondsTotal / 60) % 60; // seconds in a minute
                    newcard.querySelector('.card-time-to').innerHTML = "Starts in: " + daysTotal + " days, " + hoursTotal + " hours, " + minutesTotal + " mins";
                } else if (timeUntilEnd > 0){
                    newcard.querySelector('.card-time-to').innerHTML = "Currently Ongoing!";
                } else {
                    newcard.querySelector('.card-time-to').innerHTML = "Already Ended";
                }
                
                //This gets displayed if event have no image of it's own.
                newcard.querySelector('.card-image').src = "./images/" + type + ".webp"; //hikes.jpg
                //give unique ids to all elements for future use
                newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);
                newcard.querySelector('.card-date').setAttribute("id", "cdate" + i);
                newcard.querySelector('.card-time').setAttribute("id", "ctime" + i);

                let formatedLink = "location.href='./eventPage.html?eventId=" + eventID + "'";
                newcard.querySelector('.card').setAttribute("onClick", formatedLink);
                newcard.querySelector('.card').setAttribute("id", eventID);
                //attach to gallery
                document.getElementById("cards-go-here").appendChild(newcard);
                //newcard.addEventListener('click' => {
                //    alert("test");
                //});
                i++;
            })
        }
}

function displayImages(snap) {
        /* If there is an image for the event stored in firebase use it.
         * if there is no image use the default image for that event type */
        let allCards = document.querySelectorAll(".card");
        
        allCards.forEach(element =>{
            console.log("card", element.id);
            let elementId = element.id
            console.log(elementId);
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
        console.log("does this work?")
}

//     db.collection(collection).where('type', catSym, category).where('city' , '==', "Burnaby").limit(3).get()
//         .then(snap => {
//             var i = 1;
            
//             snap.forEach(doc => { //iterate thru each doc
//                 var eventName = doc.data().eventName;   // get value of the "name" key
//                 var description = doc.data().description;   // get value of the "details" key
//                 var type = doc.data().type;   // get value of the "details" key
//                 var time = doc.data().startDate;   // get value of the "details" key
//                 //var time = time.toDate();
//                 var startTime = doc.data().startTime;
//                 if (!startTime) {
//                     startTime = "no start time";
//                 }
//                 var eventID = doc.id;
//                 console.log(eventID);
//                 time = time.toString();
//                 time = time.slice(0, 24);
//                 let newcard = cardTemplate.content.cloneNode(true);

//                 //update title and text and image
//                 newcard.querySelector('.card-title').innerHTML = eventName;
//                 //newcard.querySelector('.card-title').href = "./eventPage.html?eventId=" + eventID;
//                 newcard.querySelector('.card-text').innerHTML = description;
//                 newcard.querySelector('.card-date').innerHTML = time;
//                 newcard.querySelector('.card-time').innerHTML = startTime;

               
//                 //This gets displayed if event have no image of it's own.
//                 newcard.querySelector('.card-image').src = "./images/" + type + ".webp"; //hikes.jpg
//                 //give unique ids to all elements for future use
//                 newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
//                 newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
//                 newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);
//                 newcard.querySelector('.card-date').setAttribute("id", "cdate" + i);
//                 newcard.querySelector('.card-time').setAttribute("id", "ctime" + i);

//                 let formatedLink = "location.href='./eventPage.html?eventId=" + eventID + "'";
//                 newcard.querySelector('.card').setAttribute("onClick", formatedLink);
//                 newcard.querySelector('.card').setAttribute("id", eventID);
//                 //attach to gallery
//                 document.getElementById("cards-go-here").appendChild(newcard);
//                 //newcard.addEventListener('click' => {
//                 //    alert("test");
//                 //});
//                 i++;
//             })
//         }).then(snap => {
//             /* If there is an image for the event stored in firebase use it.
//              * if there is no image use the default image for that event type */
//             let allCards = document.querySelectorAll(".card");
            
//             allCards.forEach(element =>{
//                 console.log("card", element.id);
//                 let elementId = element.id
//                 console.log(elementId);
//                 firebase.storage().ref('images/' + elementId).getDownloadURL()
//              .then(imgUrl => {
//                  element.src = imgUrl;
//                  element.querySelector('.card-image').src = imgUrl;
//                  console.log("element", element);
//                  console.log("imgUrl", imgUrl);
//              })
//              .catch((error) => {
//                  console.log("No image found ", error);
//              });
//             });
//             console.log("does this work?")
//         });
// }

// db.collection("events").doc("TeL6VGcmj5kW9QAl5pGx").get().then(snap => {
//     console.log(snap);
//     console.log(snap.data());
// })
displayCards("events");

//Testing code here
var myDate = "26-02-2022";
myDate = myDate.split("-");
var newDate = new Date( myDate[2], myDate[1] - 1, myDate[0]);
//newDate = newDate.getTime();
console.log(newDate);
var myDate2 = "27-02-2022";
myDate2 = myDate2.split("-");
var newDate2 = new Date( myDate2[2], myDate2[1] - 1, myDate2[0]);
//newDate2 = newDate2.getTime();

function writeEvents() {
    //define a variable for the collection you want to create in Firestore to populate data
    var EventRef = db.collection("events");

    EventRef.add({
        description: "A test event for the database",
        endTime: newDate,
        eventName: "test Event",
        owner: "test",
        postalCode: "V7E-2T9",
        province: "BC",
        startDate: newDate2,
        streetAddress: "4-4051 Garry St",
        type: "Hockey" 
    });
}



//for turning visibility on or off
const searchOptions = document.querySelector("#searchOptions");
const advancedOptions = document.querySelector("#advancedOptions");

function hiddenToggle() {
    advancedOptions.classList.toggle('hidden');
    advancedOptions.classList.toggle('advancedOptions');
}
searchOptions.addEventListener("click", hiddenToggle);
