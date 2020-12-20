const { db } = require("../util/admin");
const firebaseConfig = require("../util/config");

// const firebase = require("firebase");
// firebase.initializeApp(firebaseConfig);

// Get all users
exports.getAllUsers = (req, res) => {
  db.collection("Users")
    .orderBy("username", "desc")
    .get()
    .then((data) => {
      let users = [];
      data.forEach((doc) => {
        users.push({
          userId: doc.id,
          email: doc.data().email,
          isMentor: doc.data().isMentor,
          username: doc.data().username,
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
          interest1: doc.data().interest1,
          interest2: doc.data().interest2,
          interest3: doc.data().interest3,
          gradYear: doc.data().gradYear,
          occupation: doc.data().occupation,
          major: doc.data().major,
          school: doc.data().school,
        });
      });
      return res.json(users);
    })
    .catch((err) => console.log(err));
};

// Create new user
exports.newUser = (req, res) => {
  const newUser = {
    userId: req.body.userId,
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    interest1: req.body.interest1,
    interest2: req.body.interest2,
    interest3: req.body.interest3,
    gradYear: req.body.gradYear,
    occupation: req.body.occupation,
    major: req.body.major,
    school: req.body.school,
    isMentor: req.body.isMentor,
  };

  db.collection("Users")
    .add(newUser)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: "Error, unsuccessful" });
    });
};
