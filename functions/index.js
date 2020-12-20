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
  measurementId: "G-WH51SN4XDS",
};

const firebase = require("firebase");
firebase.initializeApp(firebaseConfig);

// Get all users
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
});

// Get all mentors
app.get("/mentors", (req, res) => {
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
});

// Get all pairings
app.get("/pairings", (req, res) => {
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
});

// Authentication middleware
const FBAuth = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else {
    console.log("No token found");
    return res.status(403).json({ error: "Unauthorized" });
  }

  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      req.user = decodedToken;
      console.log(decodedToken);
      return db
        .collection("Users")
        .where("userId", "==", req.user.uid)
        .limit(1)
        .get();
    })
    .then((data) => {
      req.user.username = data.docs[0].data().username;
      return next();
    })
    .catch((err) => {
      console.error("Error while verifying token", err);
      return res.status(403).json(err);
    });
};

// Post a new post
app.post("/post", FBAuth, (req, res) => {
  if (req.body.body.trim() === "") {
    return res.status(400).json({ body: "Body must not be empty" });
  }

  const newPost = {
    body: req.body.body,
    username: req.user.username,
    createdAt: new Date().toISOString(),
  };

  db.collection("Posts")
    .add(newPost)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created seccessfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: "Something went wrong" });
      console.log(err);
    });
});

// Create new user
app.post("/user", (req, res) => {
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

// Create new mentor
app.post("/mentor", (req, res) => {
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
});

// Create new pairing
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

// Signup helpers
const isEmpty = (string) => {
  if (string.trim() === "") return true;
  else return false;
};

const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

// Signup new user
app.post("/signup", (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    username: req.body.username,
    isMentor: req.body.isMentor,
  };

  let errors = {};

  if (isEmpty(newUser.email)) {
    errors.email = "Must not be empty";
  } else if (!isEmail(newUser.email)) {
    errors.email = "Must be a valid email address";
  }
  if (isEmpty(newUser.password)) errors.password = "Must not be empty";
  if (newUser.password !== newUser.confirmPassword)
    errors.password = "Passwords must match";
  if (isEmpty(newUser.username)) errors.username = "Must not be empty";

  if (Object.keys(errors).length > 0) return res.status(400).json(errors);

  let token, userId;
  db.doc(`/Users/${newUser.username}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res
          .status(400)
          .json({ username: "This username is already taken" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      token = idToken;
      const userCredentials = {
        username: newUser.username,
        email: newUser.email,
        userId: userId,
        isMentor: newUser.isMentor,
      };
      return db.doc(`/Users/${newUser.username}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ email: "This email is already in use" });
      } else {
        return res.status(500).json({ error: err.code });
      }
    });
});

app.post("/login", (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  let errors = {};

  if (isEmpty(user.email)) errors.email = "Must not be empty";
  if (isEmpty(user.password)) errors.password = "Must not be empty";

  if (Object.keys(errors).length > 0) return res.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === "auth/wrong-password") {
        return res
          .status(403)
          .json({ general: "Incorrect credentials, please try again" });
      } else return res.status(500).json({ error: err.code });
    });
});

exports.api = functions.https.onRequest(app);
