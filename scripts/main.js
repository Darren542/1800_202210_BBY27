//------------------------------------------------------------------------------
// Inserts the users name onto the greeting.
// If the user is not logged in redirects them to the login page.
//------------------------------------------------------------------------------
function insertName() {
  firebase.auth().onAuthStateChanged(user => {
    // Check if user is signed in:
    if (user) {
      console.log($('#navbarPlaceholder').load('./templates/navbar_logged_in.html'));
      console.log($('#footerPlaceholder').load('./templates/footer.html'));
      // Do something for the current logged-in user here: 
      console.log(user.uid);
      //go to the correct user document by referencing to the user uid
      currentUser = db.collection("users").doc(user.uid);
      //get the document for current user.
      currentUser.get()
        .then(userDoc => {
          var user_Name = userDoc.data().name;
          console.log(user_Name);
          //insert using jquery
          $(".username").text(user_Name);

        })
    } else {
      window.location.replace("./login.html");
      //skeleton.js does this not needed.
      // console.log($('#navbarPlaceholder').load('./templates/navbar.html'));
      // console.log($('#footerPlaceholder').load('./templates/footer/html'));
    }
  });
}
insertName();

//------------------------------------------------------------------------
// Get a random id to link to.
// generates a random key and uses that to find document with closest Id.
// keeps running until a document is found
//------------------------------------------------------------------------
async function randomDoc(collection, callback) {

    var answer = db.collection(collection).doc().id;
    var docId = 0;
    //console.log("Random id to search against", answer);
    db.collection(collection).where("__name__", ">", answer).limit(1).get()
        .then(function (snap) {
            let count = 0;
            snap.forEach(doc => {
                callback(doc.id);
                count++
            });
            if (count == 0) {
                console.log("no document found");
                randomDoc(collection);
            }
        })
        .catch((error) => {
            console.log("does this error go", error);
        });
}

//----------------------------------------------------------------------------------------
// Callback function sends back random doc id as function parameter of anonymous function.
// attaches docId as url param to discover button.
//----------------------------------------------------------------------------------------
randomDoc("events", function (docid) {
    let discoverButton = document.getElementById("discover");
    discoverButton.addEventListener('click', () => {
        let randomId3 = randomDoc("events");
        //console.log("click button", docid);
        window.location.href = `./eventPage.html?eventId=${docid}`;
    });
})