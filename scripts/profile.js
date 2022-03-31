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
//function to get events from the right search depends on menu on
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


//function to write events onto the html
function displayCards(collection) {
    let cardTemplate = document.getElementById("eventCardTemplate2");

    //performs the search with the categories selected
    //only does category atm.
    db.collection('users').doc(userId).collection(collection).limit(5).get()
        .then(snap => {
            var i = 1;
            document.getElementById("cards-go-here").innerHTML = "";

            snap.forEach(doc => { //iterate thru each doc
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
                newcard.querySelector('.card-image').src = "./images/" + type + ".webp"; //hikes.jpg

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
                    // console.log(sessionStorage.getItem("profileURL"));
                    document.getElementById("frame").src = sessionStorage.getItem("profileURL");
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
                    uploadImage();
                });

            document.getElementById('personalInfoFields').disabled = true;
        }
    });
    
}


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

function writeEvents() {
    //define a variable for the collection you want to create in Firestore to populate data
    var EventRef = db.collection("users").doc(userId).collection("hosting");

    EventRef.add({
        description: "First hosting event",
        endTime: newDate,
        eventName: "test Event",
        owner: "test",
        postalCode: "V7E-2T9",
        province: "BC",
        startDate: newDate2,
        streetAddress: "4-4051 Garry St",
        type: "Hockey",
        id: "we can put id here or write with same id" 
    });
}

setTimeout(function() { changeDisplay(displayedPage); }, 500);


function uploadImage() {
    //get reference to file input
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader;
    
    try {
      reader.readAsDataURL(file);
      console.log("image loaded");
      // get a reference to firebases storage
      
      var storageRef = firebase.storage().ref('users/' + userId + '/profile.png').put(file).then(function () {
          console.log("successfully uploaded")
      }).then( () => {
        location.reload();
      }).catch(error => {
          console.log(error.message)
      });
      // get a reference to where image will be stored
      
    //   // write the image into storage
    //   storageRef.put(file).then((snapshot) => {
    //     console.log('Uploaded an Image!');
    //   });
     }
    catch(err) {
      console.log("no image loaded");
    }
    //console.log("file", file);
    //setTimeout(function() { console.log("file", file); }, 500);
  
    //location.reload();
}
// to preview the image
function preview() {
    document.getElementById("frame").src = URL.createObjectURL(event.target.files[0]);
}

// document.querySelector("#submit-button").addEventListener("click", () => {
//     //save the document to be created into database
//     uploadImage();
//   });

