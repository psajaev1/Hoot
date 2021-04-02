const { db } = require("../util/admin");

exports.addActivity = (req, res) => {
  const newActivity = {
    name: req.body.name,
    date: req.body.date,
    time: req.body.time,
    duration: req.body.duration,
    invites: req.body.invites,
    owner: req.user.username,
  };
  console.log(newActivity);
  const username = req.user.username;
  console.log(username);

    for (let i = 0; i < newActivity.invites.length; i++) {
      db.doc(`Users/${newActivity.invites[i]}`)
        .collection("Activities")
        .add(newActivity)
        .catch((err) => {
          console.error("Error adding activity document: ", err);
          res.status(500).json({ error: "Error adding activity document"});
        })
    }

    db.doc(`Users/${username}`)
    .collection("Activities")
    .add(newActivity)
    .then((doc) => {
      doc.get().then((doc2) => {
        console.log('doc data looks like: ')
        console.log(doc2.data());
      });
      console.log("Activity document written with ID: ", doc.id);

      return res.status(200).json({ newActivity });
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
    .orderBy('time')
    .get()
    .then((data) => {
      let activities = [];
      data.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        activities.push({
          name: doc.data().name,
          date: doc.data().date,
          time: doc.data().time,
          duration: doc.data().duration,
          invites: doc.data().invites,
          owner: doc.data().owner,
        });
      });
      return res.json(activities);
    })
    .catch((err) => {
      console.log('Error getting activity documents: ', err);
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