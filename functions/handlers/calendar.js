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

exports.getTodaysActivities = (req, res) => {
  console.log(req.params);
  const username = req.user.username;
  console.log(username);

  db.doc(`Users/${username}`)
    .collection("Activities")
    .where('date', '==', req.params.date)
    .get()
    .then((data) => {
      let activities = [];
      data.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        activities.push({
          name: doc.data().name,
          date: doc.data().date,
        });
      });
      return res.json(activities);
    })
    .catch((err) => {
      console.log('Error gettind activity documents: ', err);
    });
};

exports.getActiveDays = (req, res) => {
  const username = req.user.username;

  db.doc(`Users/${username}`)
    .collection("Activities")
    .get()
    .then((data) => {
      let dates = [];
      data.forEach((doc) => {
        let included = false;
        for(let i = 0; i < dates.length; i++) {
          if (dates[i].date == doc.data().date) {
            included = true;
            break;
          }
        }
        if (!included) {
          dates.push({
            date: doc.data().date,
          });
        }
      });
      console.log(dates);
      return res.json(dates);
    })
    .catch((err) => {
      console.log('Error getting active days: ', err);
    });
}