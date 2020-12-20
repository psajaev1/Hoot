const functions = require("firebase-functions");

const app = require("express")();

const FBAuth = require("./util/FBAuth");

const { getAllUsers, newUser } = require("./handlers/users");
const { getAllMentors, newMentor } = require("./handlers/mentors");
const { getAllPairings, newPairing } = require("./handlers/pairings");
const { getAllPosts, newPost } = require("./handlers/posts");
const { login, signup } = require("./handlers/login");

// Users routes
app.get("/users", getAllUsers);
app.post("/user", newUser);

// Mentors routes
app.get("/mentors", getAllMentors);
app.post("/mentor", newMentor);

// Pairings routes
app.get("/pairings", getAllPairings);
app.post("/pairing", newPairing);

// Posts routes
app.get("/posts", getAllPosts);
app.post("/post", FBAuth, newPost);

// Login routes
app.post("/login", login);
app.post("/signup", signup);

exports.api = functions.https.onRequest(app);
