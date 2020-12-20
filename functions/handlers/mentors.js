const { db } = require("../util/admin");
const firebaseConfig = require("../util/config");

// const firebase = require("firebase");
// firebase.initializeApp(firebaseConfig);

// Get all mentors
exports.getAllMentors = (req, res) => {
  db.collection("Mentors")
    .orderBy("username", "desc")
    .get()
    .then((data) => {
      let mentors = [];
      data.forEach((doc) => {
        mentors.push({
          mentorId: doc.id,
          username: doc.data().username,
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
        });
      });
      return res.json(mentors);
    })
    .catch((err) => console.log(err));
};

// Create new mentor
exports.newMentor = (req, res) => {
  const newMentor = {
    mentorId: req.body.mentorId,
    username: req.body.username,
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
  };

  db.collection("Mentors")
    .add(newMentor)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: "Error, unsuccessful" });
    });
};
