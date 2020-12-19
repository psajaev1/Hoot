const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

//  Create and Deploy Your First Cloud Functions
//  https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Hoot!");
});

exports.getUsers = functions.https.onRequest((req, res) => {
  db.collection("Users")
    .get()
    .then((data) => {
      let users = [];
      data.forEach((doc) => {
        users.push(doc.data());
      });
      return res.json(users);
    })
    .catch((err) => console.log(err));
});

exports.newUser = functions.https.onRequest((req, res) => {
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
    email: req.body.email
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
