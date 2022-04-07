//get the params from the url bar
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

//get the category from params
let category = "nothing";
let catSearch = false;
if (urlParams.get('categoryToggle')) {
    category = urlParams.get('categories');
    catSearch = true;
}

//get the location from params
let locationId = "nothing"
let locationSearch = false;
if (urlParams.get('locationToggle')) {
    locationId = urlParams.get('locations');
    locationSearch = true;
}

//get the sortby type and the timeStamp for search
let sortBy = urlParams.get('sort-by');
let minTimeStamp = Date.parse('2000-02-28T13:09');
//console.log("min date", minTimeStamp)
//console.log(sortBy);
if (sortBy = "timeStampStart") {
    let minDate = urlParams.get('startTime');
    minTimeStamp = Date.parse(minDate) - 25200001; //messy timezone correction
    //console.log("minDate", minDate);
}
// don't display events before this time by default
if (!minTimeStamp){
    //minTimeStamp = Date.now() - 86400000;
    minTimeStamp = Date.parse('2000-02-28T13:09');
}

//console.log("the city", locationId);

//get the distance from user
//TODO no code here yet

//--------------------------------------------------------------------------------------
// Displays the cards on the pages body. Param is what collection to search in.
// Cards that are displayed are choosen from the search parameters picked.
// Does a database search and uses the return as parameters to display cards and images.
//--------------------------------------------------------------------------------------
function display(collection) {

    //--------------------------------------------------------------------
    // Search parameters change depending on the params in the url
    // You can't do multiple queries in one search if they are not '=='
    //--------------------------------------------------------------------
    if (catSearch && locationSearch) {
        db.collection(collection).where('type', "==", category).where('city', '==', locationId).where(sortBy, ">", minTimeStamp).orderBy(sortBy).limit(5).get().then(function (snap) {
            displayCards(snap);
            displayImages(snap);
        })
    } else if (catSearch) {
        db.collection(collection).where('type', "==", category).where(sortBy, ">=", minTimeStamp).orderBy(sortBy).limit(5).get().then(function (snap) {
            displayCards(snap);
            displayImages(snap);
        });
    } else if (locationSearch) {
        db.collection(collection).where('city', '==', locationId).where(sortBy, ">=", minTimeStamp).orderBy(sortBy).limit(5).get().then(function (snap) {
            displayCards(snap);
            displayImages(snap);
        });
    } else {
        console.log("no search params")
        console.log(minTimeStamp);
        db.collection(collection).where(sortBy, ">=", minTimeStamp).orderBy(sortBy).limit(5).get().then(function (snap) {
            displayCards(snap);
            displayImages(snap);
        })
    }
}

//--------------------------------------------------------------------------------------
// Iterates through all the documents given as a parameter.
// Creates a new card and inserts the documents information into it.
// Appends the newly created card to the "cards-go-here" element on the html document.
//--------------------------------------------------------------------------------------
function displayCards(snap) {
    var i = 1;
    let cardTemplate = document.getElementById("eventCardTemplate2");

    snap.forEach(doc => { //iterate thru each doc
        // set all the values to be displayed as variables
        var eventName = doc.data().eventName;
        var description = doc.data().description;
        var type = doc.data().type;
        // get rid of date into that is not wanted to be displayed
        var time = doc.data().startDate; 
        time = time.toString();
        time = time.slice(0, 24);
        // display no start time instead of NaN
        var startTime = doc.data().startTime;
        if (!startTime) {
            startTime = "no start time";
        }
        var eventID = doc.id;
        //console.log(eventID);

        // Create a new card to place information into.
        let newcard = cardTemplate.content.cloneNode(true);

        // inserts data into the new cards innerHTML
        newcard.querySelector('.card-title').innerHTML = eventName;
        newcard.querySelector('.card-text').innerHTML = description;
        newcard.querySelector('.card-date').innerHTML = "Date: " + time;
        newcard.querySelector('.card-time').innerHTML = "Starts at: " + startTime;
        newcard.querySelector('.card-time-to').innerHTML = displayTimeUntilStart(doc);

        //give unique ids to all elements in card for future use
        newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
        newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
        newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);
        newcard.querySelector('.card-date').setAttribute("id", "cdate" + i);
        newcard.querySelector('.card-time').setAttribute("id", "ctime" + i);

        // Makes the card take you to events page when you click it
        let formatedLink = "location.href='./eventPage.html?eventId=" + eventID + "'";
        newcard.querySelector('.card').setAttribute("onClick", formatedLink);
        newcard.querySelector('.card').setAttribute("id", eventID);

        //attach to gallery
        document.getElementById("cards-go-here").appendChild(newcard);
        i++;
    })
}


//-----------------------------------------------------------------------------
// function for displaying images on cards.
// Tries to get an image from the firebase storage.
// If there is no image to display the default image for event type is used.
//-----------------------------------------------------------------------------
function displayImages(snap) {
    snap.forEach(doc => {
        let cardId = doc.id;
        let type = doc.data().type;
        let card = document.getElementById(cardId);
        //console.log("card check", card);

        firebase.storage().ref('images/' + cardId).getDownloadURL()
            .then(imgUrl => {
                card.querySelector('.card-image').src = imgUrl;
                //console.log("card element", card);
                //console.log("imgUrl", imgUrl);
            })
            .catch((error) => {
                //console.log("No image found ", error);
                // This is the local images url
                card.querySelector('.card-image').src = "./images/" + type + ".webp";
            });
    });
}

//-----------------------------------------------------------------------
// Checks the events start and end timeStamp againts the current time.
// Returns the time until the event starts if event has not started yet.
// If event is ongoing returns that event is ongoinging.
// If event has ended returns that event has ended.
//-----------------------------------------------------------------------
function displayTimeUntilStart(doc){
    var timeUntilStart = doc.data().timeStampStart - Date.now() + 25200001;
    var timeUntilEnd = doc.data().timeStampEnd - Date.now() + 25200001;
    let StartTime;
    // console.log("Time until start", timeUntilStart);
    if (timeUntilStart > 0) {
        var secondsTotal = timeUntilStart / 1000; // convert ms to seconds
        var daysTotal = Math.floor(secondsTotal / 86400); // seconds in a day
        var hoursTotal = Math.floor(secondsTotal / 3600) % 24; // seconds in an hour
        var minutesTotal = Math.floor(secondsTotal / 60) % 60; // seconds in a minute
        StartTime = "Starts in: " + daysTotal + " days, " + hoursTotal + " hours, " + minutesTotal + " mins";
    } else if (timeUntilEnd > 0) {
        StartTime = '<span style="color:green;">Currently Ongoing!</span>';
    } else {
        StartTime = '<span style="color:red;">Already Ended</span>';
    }
    return StartTime;
}

//-----------------------------------------------------------------
// Code for testing creating dayes and spliting them for display
//-----------------------------------------------------------------
// //Testing code here
// var myDate = "26-02-2022";
// myDate = myDate.split("-");
// var newDate = new Date( myDate[2], myDate[1] - 1, myDate[0]);
// //newDate = newDate.getTime();
// console.log(newDate);
// var myDate2 = "27-02-2022";
// myDate2 = myDate2.split("-");
// var newDate2 = new Date( myDate2[2], myDate2[1] - 1, myDate2[0]);
// //newDate2 = newDate2.getTime();


//-----------------------------------------------------------------
// Toggles the visability of the advanced search functions display.
//-----------------------------------------------------------------
const searchOptions = document.querySelector("#searchOptions");
const advancedOptions = document.querySelector("#advancedOptions");

function hiddenToggle() {
    advancedOptions.classList.toggle('hidden');
    advancedOptions.classList.toggle('advancedOptions');
}
searchOptions.addEventListener("click", hiddenToggle);

//------------------------------------------------------------------
// Load in all the display elements at start
// Param tell what collection to search and display from
//------------------------------------------------------------------
display("events");