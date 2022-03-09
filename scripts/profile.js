//check the URL bar for the page wanted in profile

//get variables saved for all the items on page (the nav buttons and where items will be loaded)
const myProfileNav = document.querySelector("#myProfileNav");
const attendingNav = document.querySelector("#attendingNav");
const hostingNav = document.querySelector("#hostingNav");
const favouritesNav = document.querySelector("#favouritesNav");
const historyNav = document.querySelector("#historyNav");
const calendarNav = document.querySelector("#calendarNav");
const userProfile = document.querySelector("#userProfile");

//event listeners set up on the buttons
myProfileNav.addEventListener("click", () => {
    changeDisplay("profile");
});
myProfileNav.myParam = "profile";
attendingNav.addEventListener("click", testFunction);
hostingNav.addEventListener("click", testFunction);

function testFunction() {
    console.log("test function has run");
}
//function to get events from the right search depends on menu on
function changeDisplay(choice) {
    if (choice == "profile") {
        userProfile.classList.remove('hidden');
        console.log("user profile");
    }
    else {
        console.log("Not user profile");
        userProfile.classList.add('hidden');
    }

}


//function to write events onto the html
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
                var time = time.toDate();
                var eventID = doc.id;
                console.log(eventID);
                time = time.toString();
                time = time.slice(0, 24);
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = eventName;
                //newcard.querySelector('.card-title').href = "./eventPage.html?eventId=" + eventID;
                newcard.querySelector('.card-text').innerHTML = description;
                newcard.querySelector('.card-time').innerHTML = time;
                newcard.querySelector('.card-image').src = "./images/" + type + ".jpeg"; //hikes.jpg

                //give unique ids to all elements for future use
                newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);
                newcard.querySelector('.card-time').setAttribute("id", "ctime" + i);

                let formatedLink = "location.href='./eventPage.html?eventId=" + eventID + "'";
                newcard.querySelector('.card').setAttribute("onClick", formatedLink);
                //attach to gallery
                document.getElementById("cards-go-here").appendChild(newcard);
                //newcard.addEventListener('click' => {
                //    alert("test");
                //});
                i++;
            })
        })
}


// Javascript for the User Profile Page
function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var userName = userDoc.data().name;
                    var aboutMe = userDoc.data().aboutMe;
                    var userCity = userDoc.data().city;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (aboutMe != null) {
                        document.getElementById("aboutMeInput").value = aboutMe;
                    }
                    if (userCity != null) {
                        document.getElementById("cityInput").value = userCity;
                    }
                })
        } else {
            // No user is signed in.
            console.log ("No user is signed in");
        }
    });
}

function editUserInfo() {
   //Enable the form fields
   document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
    userName = document.getElementById('nameInput').value;
    aboutMe = document.getElementById('aboutMeInput').value;
    userCity = document.getElementById('cityInput').value;
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser.update({
                name: userName,
                city: userCity,
                aboutMe: aboutMe
            })
                .then(() => {
                    console.log("Document successfully updated!");
                });

            document.getElementById('personalInfoFields').disabled = true;
        }
    });
}

populateInfo();