const { db } = require("../util/admin");
const firebaseConfig = require("../util/config");

// const firebase = require("firebase");
// firebase.initializeApp(firebaseConfig);

// Get all posts
exports.getAllPosts = (req, res) => {
  db.collection("Posts")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let posts = [];
      data.forEach((doc) => {
        posts.push({
          body: doc.data().body,
          username: doc.data().username,
          createdAt: doc.data().createdAt,
        });
      });
      return res.json(posts);
    })
    .catch((err) => console.log(err));
};

// Create new post
exports.newPost = (req, res) => {
  if (req.body.body.trim() === "") {
    return res.status(400).json({ body: "Body must not be empty" });
  }

  const newPost = {
    body: req.body.body,
    username: req.user.username,
    userImage: req.user.imageUrl,
    createdAt: new Date().toISOString(),
    likeCount: 0,
    commentCount: 0,
  };

  db.collection("Posts")
    .add(newPost)
    .then((doc) => {
      const resPost = newPost;
      resPost.postId = doc.id;
      res.json({ resPost });
    })
    .catch((err) => {
      res.status(500).json({ error: "Something went wrong" });
      console.log(err);
    });
};

// Fetch one post
exports.getPost = (req, res) => {
  let postData = {};
  db.doc(`/Posts/${req.params.postId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Post not found" });
      }
      postData = doc.data();
      postData.postId = doc.id;
      return db
        .collection("Comments")
        .orderBy("createdAt", "desc")
        .where("postId", "==", req.params.postId)
        .get();
    })
    .then((data) => {
      postData.comments = [];
      data.forEach((doc) => {
        postData.comments.push(doc.data());
      });
      return res.json(postData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

// Comment on a post
exports.commentOnPost = (req, res) => {
  if (req.body.body.trim() === "")
    return res.status(400).json({ error: "Must not be empty" });

  const newComment = {
    body: req.body.body,
    createdAt: new Date().toISOString(),
    postId: req.params.postId,
    username: req.user.username,
    userImage: req.user.imageUrl,
  };

  db.doc(`/Posts/${req.params.postId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Post not found" });
      }
      return db.collection("Comments").add(newComment);
    })
    .then(() => {
      res.json(newComment);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Something went wrong" });
    });
};

// Like a post
exports.likePost = (req, res) => {
  const likeDocument = db
    .collection("Likes")
    .where("username", "==", req.user.username)
    .where("postId", "==", req.params.postId)
    .limit(1);

  const postDocument = db.doc(`/Posts/${req.params.postId}`);

  let postData;

  postDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        postData = doc.data();
        postData.postId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: "Post not found" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return db
          .collection("Likes")
          .add({
            postId: req.params.postId,
            username: req.user.username,
          })
          .then(() => {
            postData.likeCount++;
            return postDocument.update({ likeCount: postData.likeCount });
          })
          .then(() => {
            return res.json(postData);
          });
      } else {
        return res.status(400).json({ error: "Post already liked" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.unlikePost = (req, res) => {
  const likeDocument = db
    .collection("Likes")
    .where("username", "==", req.user.username)
    .where("postId", "==", req.params.postId)
    .limit(1);

  const postDocument = db.doc(`/Posts/${req.params.postId}`);

  let postData;

  postDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        postData = doc.data();
        postData.postId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: "Post not found" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return res.status(400).json({ error: "Post not liked" });
      } else {
        return db
          .doc(`/Likes/${data.docs[0].id}`)
          .delete()
          .then(() => {
            postData.likeCount--;
            return postDocument.update({ likeCount: postData.likeCount });
          })
          .then(() => {
            return res.json(postData);
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};