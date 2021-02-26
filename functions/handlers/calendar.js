const { db } = require("../util/admin");
const firebaseConfig = require("../util/config");

const firebase = require("firebase");
// const { json } = require("express");
// firebase.initializeApp(firebaseConfig);
 
//checks if user is logged in
exports.checkAuth = (req, res) => {
 
   var user = firebase.auth().currentUser;
   return user;
 
   // firebase
   //   .auth()
   //   .onAuthStateChanged(function(authUser) {
   //       if (authUser) {
   //         return authUser;
   //       } else {
   //         return null;
   //       }
   //   });
    // firebase
   //   .auth()
   //   .signInWithEmailAndPassword(user.email, user.password)
   //   .then((data) => {
   //     return data.user.getIdToken();
   //   })
   //   .then((token) => {
   //     return res.json({ token });
   //   })
   //   .catch((err) => {
   //     console.error(err);
   //     if (err.code === "auth/wrong-password") {
   //       return res
   //         .status(403)
   //         .json({ general: "Incorrect credentials, please try again" });
   //     } else return res.status(500).json({ error: err.code });
   //   });
 };
