const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

const app = require("express")();

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBO5cCEFEWcQcdaxkoDXe6_NyrdSvxh_cM",
    authDomain: "senior-design-a1e06.firebaseapp.com",
    databaseURL: "https://senior-design-a1e06-default-rtdb.firebaseio.com",
    projectId: "senior-design-a1e06",
    storageBucket: "senior-design-a1e06.appspot.com",
    messagingSenderId: "366169095626",
    appId: "1:366169095626:web:8509324ffd8580f804e333",
    measurementId: "G-WH51SN4XDS"
  };

const firebase = require('firebase');
firebase.initializeApp(firebaseConfig);

app.get("/users", (req, res) => {
  db.collection("Users")
    .orderBy("username", "desc")
    .get()
    .then((data) => {
      let users = [];
      data.forEach((doc) => {
        users.push({
          userId: doc.id,
          username: doc.data().username,
          password: doc.data().password,
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
          interest1: doc.data().interest1,
          interest2: doc.data().interest2,
          interest3: doc.data().interest3,
          gradYear: doc.data().gradYear,
          occupation: doc.data().occupation,
          major: doc.data().major,
          school: doc.data().school,
          email: doc.data().email,
        });
      });
      return res.json(users);
    })
    .catch((err) => console.log(err));
});

app.get("/mentors", (req, res) => {
  db.collection("Mentors")
  .orderBy('username', 'desc')
    .get()
    .then((data) => {
      let mentors = [];
      data.forEach((doc) => {
        mentors.push({
          mentorId: doc.id,
          username: doc.data().username,
          password: doc.data().password,
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
          interest1: doc.data().interest1,
          interest2: doc.data().interest2,
          interest3: doc.data().interest3,
          gradYear: doc.data().gradYear,
          occupation: doc.data().occupation,
          major: doc.data().major,
          school1: doc.data().school1,
          school2: doc.data().school2,
          email: doc.data().email,
        });
      });
      return res.json(mentors);
    })
    .catch((err) => console.log(err));
});

app.get("/pairings", (req, res) => {
  db.collection("Pairings")
  .orderBy('focus', 'desc')
    .get()
    .then((data) => {
      let pairings = [];
      data.forEach((doc) => {
        pairings.push({
          pairingId: doc.id,
          user: doc.data().user,
          mentor: doc.data().mentor,
          focus: doc.data().focus,
        });
      });
      return res.json(pairings);
    })
    .catch((err) => console.log(err));
});

app.post("/user", (req, res) => {
  const newUser = {
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    interest1: req.body.interest1,
    interest2: req.body.interest2,
    interest3: req.body.interest3,
    gradYear: req.body.gradYear,
    occupation: req.body.occupation,
    major: req.body.major,
    school: req.body.school,
    email: req.body.email,
  };

  db.collection("Users")
    .add(newUser)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: "Error, unsuccessful" });
    });
});

app.post("/mentor", (req, res) => {
  const newMentor = {
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    interest1: req.body.interest1,
    interest2: req.body.interest2,
    interest3: req.body.interest3,
    gradYear: req.body.gradYear,
    occupation: req.body.occupation,
    major: req.body.major,
    school1: req.body.school1,
    school2: req.body.school2,
    email: req.body.email,
  };

  db.collection("Mentors")
    .add(newMentor)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: "Error, unsuccessful" });
    });
});

app.post("/pairing", (req, res) => {
  const newPairing = {
    user: req.body.user,
    mentor: req.body.mentor,
    focus: req.body.focus,
  };

  db.collection("Pairings")
    .add(newPairing)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: "Error, unsuccessful" });
    });
});

exports.api = functions.https.onRequest(app);
