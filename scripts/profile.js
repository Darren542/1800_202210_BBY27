var userId;
//check the URL bar for the page wanted in profile
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let displayedPage = urlParams.get('display');
//get variables saved for all the items on page (the nav buttons and where items will be loaded)
const myProfileNav = document.querySelector("#myProfileNav");
const attendingNav = document.querySelector("#attendingNav");
const hostingNav = document.querySelector("#hostingNav");
const favouritesNav = document.querySelector("#favouritesNav");
const historyNav = document.querySelector("#historyNav");
const calendarNav = document.querySelector("#calendarNav");
const userProfile = document.querySelector("#userProfile");
const cards = document.querySelector("#cards");
const likedNav = document.querySelector("#favouritesNav");

//event listeners set up on the buttons
myProfileNav.addEventListener("click", () => {
    changeDisplay("profile");
});

attendingNav.addEventListener("click", () => {
    changeDisplay("attending");
});
hostingNav.addEventListener("click", () => {
    changeDisplay("hosting");
});
likedNav.addEventListener("click", () => {
    changeDisplay("liked");
});

function testFunction() {
    console.log("test function has run");
}
//----------------------------------------------------------------
//function to get events from the right search depends on menu on
//----------------------------------------------------------------
function changeDisplay(choice) {
    if (choice == "profile") {
        userProfile.classList.remove('hidden');
        cards.classList.add('hidden');
        populateInfo();
        console.log("user profile");
    }
    else {
        console.log("Not user profile");
        userProfile.classList.add('hidden');
        cards.classList.remove('hidden');
        displayCards(choice);
    }  
    let newUrl = "/profile.html?display=" + choice;
    window.history.pushState('page2', 'Title', newUrl);
    
}

//-----------------------------------------------------------------------------
// displays the correct collection of cards on page
//-----------------------------------------------------------------------------
function displayCards(collection) {
    let cardTemplate = document.getElementById("eventCardTemplate2");

    //performs the search with the categories selected
    //only does category atm.
    db.collection('users').doc(userId).collection(collection).limit(5).get()
        .then(function(snap) {
            console.log("what is in snap here", snap);
            showCards(snap);
            displayImages(snap);
        });
}

//--------------------------------------------------------------
// Fills in the profile page with the users information.
//--------------------------------------------------------------
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
                    // console.log(sessionStorage.getItem("profileURL"));
                    document.getElementById("frame").src = sessionStorage.getItem("profileURL");
                })
        } else {
            // No user is signed in.
            console.log ("No user is signed in");
        }
    });
}

//---------------------------------------------------------------------------
// Makes the fields on the page editable so values can be changed.
// Only the event owner should be able to do this.
//---------------------------------------------------------------------------
function editUserInfo() {
   //Enable the form fields
   document.getElementById('personalInfoFields').disabled = false;
}

//---------------------------------------------------------------------------
// Save the newly filled in user information
// Also runs the image upload function, which will update user profile image.
//---------------------------------------------------------------------------
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
                    uploadImage();
                });

            document.getElementById('personalInfoFields').disabled = true;
        }
    });
    
}

//-----------------------------------------------------
// This page should not accessed by users not logged in
// This will redirect to login page if no user
//-----------------------------------------------------
firebase.auth().onAuthStateChanged(user => {
  if(user){
    userId = user.uid;
    console.log(userId);
  }else{
    window.location.href = "./login.html";
  }
    
});

//Testing code here
var myDate = "09-03-2022";
myDate = myDate.split("-");
var newDate = new Date( myDate[2], myDate[1] - 1, myDate[0]);
//newDate = newDate.getTime();
console.log(newDate);
var myDate2 = "11-03-2022";
myDate2 = myDate2.split("-");
var newDate2 = new Date( myDate2[2], myDate2[1] - 1, myDate2[0]);
//newDate2 = newDate2.getTime();

setTimeout(function() { changeDisplay(displayedPage); }, 500);

//-----------------------------------------------------------------------
// Uploads the new profile image for the user.
// If not file is choosen does nothing.
//-----------------------------------------------------------------------
function uploadImage() {
    //get reference to file input
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader;
    
    try {
      reader.readAsDataURL(file);
      console.log("image loaded");
      // get a reference to firebases storage
      // get a reference to where image will be stored
      var storageRef = firebase.storage().ref('users/' + userId + '/profile.png').put(file).then(function () {
          console.log("successfully uploaded")
      }).then( () => {
        location.reload();
      }).catch(error => {
          console.log(error.message)
      });     
     }
    catch(err) {
      console.log("no image loaded");
    }
}

//-----------------------------------------------------------------------------
// Used to preview the image
//-----------------------------------------------------------------------------
function preview() {
    document.getElementById("frame").src = URL.createObjectURL(event.target.files[0]);
}

// document.querySelector("#submit-button").addEventListener("click", () => {
//     //save the document to be created into database
//     uploadImage();
//   });

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

//--------------------------------------------------------------------------------------
// Iterates through all the documents given as a parameter.
// Creates a new card and inserts the documents information into it.
// Appends the newly created card to the "cards-go-here" element on the html document.
//--------------------------------------------------------------------------------------
function showCards(snap) {
    var i = 1;
    let cardTemplate = document.getElementById("eventCardTemplate2");
    document.getElementById("cards-go-here").innerHTML = "";
    console.log("what is in snap", snap);
    snap.forEach(doc => {//iterate thru each doc
        
        var eventName = doc.data().eventName;   // get value of the "name" key
        var description = doc.data().description;   // get value of the "details" key
        var type = doc.data().type;   // get value of the "details" key
        var time = doc.data().startDate;   // get value of the "details" key
        //var time = time.toDate();
        var eventID = doc.id;
        console.log("docId", doc.id);
        console.log(eventID);
        time = time.toString();
        time = time.slice(0, 24);
        let newcard = cardTemplate.content.cloneNode(true);

        //update title and text and image
        newcard.querySelector('.card-title').innerHTML = eventName;
        //newcard.querySelector('.card-title').href = "./eventPage.html?eventId=" + eventID;
        newcard.querySelector('.card-text').innerHTML = description;
        newcard.querySelector('.card-time').innerHTML = time;
        //newcard.querySelector('.card-image').src = "./images/" + type + ".webp"; //hikes.jpg

        //give unique ids to all elements for future use
        newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
        newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
        newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);
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
    });
}