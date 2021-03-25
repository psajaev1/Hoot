const { db } = require("../util/admin");
// const firebaseConfig = require("../util/config");

// const firebase = require("firebase");
// const { json } = require("express");
// firebase.initializeApp(firebaseConfig);

exports.addActivity = (req, res) => {
  const newActivity = {
    name: req.body.name,
    date: req.body.date,
  };
  console.log(newActivity);
  const username = req.user.username;
  console.log(username);

  db.doc(`Users/${username}`)
    .collection("Activities")
    .add(newActivity)
    .then((doc) => {
      console.log("Activity document written with ID: ", doc.id);
      const resActivity = newActivity;
      resActivity.activityId = doc.id;
      return res.json({ resActivity });
      // return res.json({ db.doc(`/Users/${username}`).userId })
    })
    .catch((err) => {
      console.error("Error adding activity document: ", err);
      res.status(500).json({ error: "Error adding activity document"});
    })
};
