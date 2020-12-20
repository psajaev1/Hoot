const { db } = require("../util/admin");
const firebaseConfig = require("../util/config");

// const firebase = require("firebase");
// firebase.initializeApp(firebaseConfig);

// Get all pairings
exports.getAllPairings = (req, res) => {
  db.collection("Pairings")
    .orderBy("focus", "desc")
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
};

// Create new pairing
exports.newPairing = (req, res) => {
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
};
