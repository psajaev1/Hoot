let db = {
  users: [
    {
      email: "stevshap@seas.upenn.edu",
      isMentor: false,
      userId: "EXa7l8sGcYUXDw8CwjdoDDiPlDw2",
      username: "stevshap",
      imageUrl:
        "https:firebasestorage.googleapis.com/v0/b/senior-design-a1e06.appspot.com/o/blank-profile-picture-973460_1280.png?alt=media",
    },
  ],
  mentors: [
    {
      email: "vanessaz@seas.upenn.edu",
      isMentor: true,
      userId: "KWCs0mEzLxWyRbBtZmEJlLWTj7E3",
      username: "vanessaz",
      imageurl:
        "https:firebasestorage.googleapis.com/v0/b/senior-design-a1e06.appspot.com/o/blank-profile-picture-973460_1280.png?alt=media",
    },
  ],
  posts: [
    {
      postId: "qWTfPVsni5ypBiaKAGdm",
      body: "Looking for a mentor!",
      username: "stevshap",
      createdAt: "2020-12-20T16:38:12.099Z",
    },
  ],

  comments: [
    {
      username: "stevshap",
      postId: "qWTfPVsni5ypBiaKAGdm",
      body: "Me too!",
      createdAt: "2020-12-20T16:38:12.099Z",
    },
  ],

  pairings: [
    {
      paringId: "KWCs0mEzLxWyRbBtZmEJlLWTj7E3",
      user: "stevshap",
      mentor: "vanessaz",
      focus: "Entrepreneurship",
    },
  ],
};

const UserDetails = {
  credentials: {
    userId: "EXa7l8sGcYUXDw8CwjdoDDiPlDw2",
    email: "stevshap@seas.upenn.edu",
    username: "stevshap",
    imageUrl:
      "https:firebasestorage.googleapis.com/v0/b/senior-design-a1e06.appspot.com/o/blank-profile-picture-973460_1280.png?alt=media",
    isMentor: false,
  },
  likes: [
    {
      username: "stevshap",
      postId: "qWTfPVsni5ypBiaKAGdm",
    },
  ],
};
