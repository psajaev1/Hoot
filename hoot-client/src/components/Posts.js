import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Link from "react-router-dom/Link";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import defaultLogo from '../../src/images/default.png'
import firebase from 'firebase/app';


const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
  },
  image: {
    // minWidth: 200,
    height: 0,
  },
  content: {
    padding: 50,
    objectFit: "cover",
  },
};
export class Posts extends Component {
  state = {
    comments: [],
  };


  componentDidMount() {
    var db = firebase.firestore();

    db.collection("Comments").get()
      .then((res) => {
        const arr = [];
        res.forEach(function (doc) {
          arr.push(doc.data());
        });
        this.setState({ comments: arr });

      })
      .catch((err) => console.log(err));

  }



  render() {
    dayjs.extend(relativeTime)
    const {
      classes,
      posts: { body, commentCount, createdAt, likeCount, userImage, username },
    } = this.props;


    // console.log("hi phil phil bill bill");
    // console.log(this.props);
    //  console.log(this.state.comments);


    // console.log("---");
    // //   console.log(this.props.doc().id);

    // const newID = db.collection("Posts").doc().id;
    // console.log(newID);

    let showComments = this.state.comments ? (
      this.state.comments.map((comments) => (
        <Card>
          <CardContent>
            <Typography>
              {comments.body}
            </Typography>
          </CardContent>
        </Card>
      ))
    ) : (
      <p></p>
    );


    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.image}
          image={userImage}
          title="Profile pic"
          style={styles.image}
        />
        <img src={defaultLogo} alt="logo" width='100' height='150' />

        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            color="primary"
            component={Link}
            to={`/users/${username}`}
          >
            {username}
          </Typography>
          <Typography variant="body2">{dayjs(createdAt).fromNow()}</Typography>
          <Typography variant="body1">{body}</Typography>
          <br></br>
          {showComments}
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Posts);
