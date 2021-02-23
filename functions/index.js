const functions = require("firebase-functions");

const app = require("express")();

const FBAuth = require("./util/FBAuth");

const {
  getAllUsers,
  newUser,
  getAuthenticatedUser,
} = require("./handlers/users");
const { getAllMentors, newMentor } = require("./handlers/mentors");
const { getAllPairings, newPairing } = require("./handlers/pairings");
const {
  getAllPosts,
  newPost,
  getPost,
  deletePost,
  commentOnPost,
  likePost,
  unlikePost,
} = require("./handlers/posts");
const {
  login,
  signup,
  uploadImage,
  addUserDetails,
} = require("./handlers/login");

// Users routes
app.get("/users", getAllUsers);
//app.post("/user", newUser);
app.get("/user", FBAuth, getAuthenticatedUser);

// Mentors routes
app.get("/mentors", getAllMentors);
app.post("/mentor", newMentor);

// Pairings routes
app.get("/pairings", getAllPairings);
app.post("/pairing", newPairing);

// Posts routes
app.get("/posts", getAllPosts);
app.post("/post", FBAuth, newPost);
app.get("/post/:postId", getPost);
app.delete("/posts/:postId", FBAuth, deletePost);
app.get("/post/:postId/like", FBAuth, likePost);
app.get("/post/:postId/unlike", FBAuth, unlikePost);
app.post("/post/:postId/comment", FBAuth, commentOnPost);

// Login routes
app.post("/login", login);
app.post("/signup", signup);
app.post("/user/image", FBAuth, uploadImage);
app.post("/user", FBAuth, addUserDetails);

exports.api = functions.https.onRequest(app);
