//get the params from the url bar
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

//get the category from params
let category = "nothing";
let catSym = "!=";
if (urlParams.get('categoryToggle')) {
    category = urlParams.get('categories');
    catSym = "==";
} 

//get the location from params
let locationId = "nothing"
if (urlParams.get('locationToggle')) {
    location = urlParams.get('locationId');
} 

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


function displayCards(collection) {
    let cardTemplate = document.getElementById("eventCardTemplate2");

    //performs the search with the categories selected
    //only does category atm.
    db.collection(collection).where('type', catSym, category).limit(2).get()
        .then(snap => {
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
        }).then(snap => {
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
        });
}

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
