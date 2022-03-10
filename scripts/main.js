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
          //method #1:  insert with html only
          //document.getElementById("name-goes-here").innerText = user_Name;    //using javascript
          //method #2:  insert using jquery
          $(".username").text(user_Name);

        })
    } else {
      console.log($('#navbarPlaceholder').load('./templates/navbar.html'));
      console.log($('#footerPlaceholder').load('./templates/footer/html'));
    }
  });
}
insertName();