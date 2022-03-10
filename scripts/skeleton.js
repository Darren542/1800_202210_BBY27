//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton() {
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
            $(".username").text(user_Name);

            //code to logout user
            const logout = document.querySelector("#logout");
            console.log("logout3", logout);
            const auth = firebase.auth();
            logout.addEventListener("click", (e) => {
                e.preventDefault();
                auth.signOut().then(() => {
                    console.log("user signed out");
                    window.location.assign("index.html");
                });
            });
          })
      } else {
        console.log($('#navbarPlaceholder').load('./templates/navbar.html'));
        console.log($('#footerPlaceholder').load('./templates/footer.html'));
      }
    });
  }

loadSkeleton();