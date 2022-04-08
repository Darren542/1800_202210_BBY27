//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDwJkiKzrebKklZjpqvmM9lpLmsleDCZAI",
    authDomain: "comp1800-bby27.firebaseapp.com",
    projectId: "comp1800-bby27",
    storageBucket: "comp1800-bby27.appspot.com",
    messagingSenderId: "1078657421061",
    appId: "1:1078657421061:web:fceeb5733ac65fd387316c"
  };
  
//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();