import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Posts from "../components/Posts";
import Profile from "../components/Profile";
import networkLogo from '../images/Networks.jpg'
import firebase from 'firebase/app';
import 'firebase/firestore';
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/userActions';
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { createPost } from '../redux/actions/userActions';
import defaultLogo from '../../src/images/default.png';
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";



firebase.initializeApp(
  {
    projectId: "senior-design-a1e06",
    databaseURL: "https://senior-design-a1e06-default-rtdb.firebaseio.com/"
  });
var db = firebase.firestore();


const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
    height: 200,
  },
  content: {
    padding: 0,
    position: "center",
    objectFit: "cover",
  },
};



export class home extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    posts: [],
  };




  componentDidMount() {

    db.collection("Posts").orderBy("createdAt", "desc").get()
      .then((res) => {
        const arr = [];
        res.forEach(function (doc) {
          arr.push(doc.data());
        });
        this.setState({ posts: arr });

      })
      .catch((err) => console.log(err));



  }


  handleSubmit = (event) => {
    event.preventDefault();

    console.log("home line 57");
    console.log(this.state);
    console.log(this.props);

    const newID = db.collection("Posts").doc().id;
    console.log(newID);

    const postData = {
      body: this.state.newPost,
      username: this.props.user.credentials.username,
      userImage: this.props.user.credentials.imageUrl,
      postId: newID
    };

    console.log("befpre creating post");
    console.log(postData);

    this.props.createPost(postData, this.props.history);

    console.log("after");
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {



    let showPosts = this.state.posts ? (
      this.state.posts.map((posts) => (

        <Posts key={posts.username} posts={posts} />
      ))
    ) : (
      <p> Loading Posts... </p>
    );

    return (
      <div style={{ backgroundColor: "#cceeff", width: "1000px", minHeight: "1020px", margin: "100px" }}>
        <img
          src={networkLogo}
          alt="HTML5"
          style={{ width: 260, height: 1000, position: 'absolute', top: 75, left: 1260 }} />

        <img
          src={networkLogo}
          alt="HTML5"
          style={{ width: 260, height: 1000, position: 'absolute', top: 75, left: 0 }} />

        <Grid container spacing={10}>
          <Grid item sm={4} xs={4}>
            <br />
            {/* <Profile /> */}
            <Card >
              <CardContent >
                <Typography
                  variant="h5"
                >
                  {"Account Information"}
                </Typography>
              </CardContent>
              <CardMedia
                image={defaultLogo}
                title="Profile pic"
                style={styles.image}
              />
              <CardContent >
                <Typography>{"Username: "}</Typography>
                <Typography
                  variant="h8"
                  color="primary"
                >
                  {this.props.user.credentials.username}
                </Typography>
                <br></br>
                <Typography>{"Email: "}</Typography>
                <Typography
                  variant="h8"
                >
                  {this.props.user.credentials.email}
                </Typography>
              </CardContent>
            </Card>
            <br />
            <br />
            <Card>
              <CardContent>
                <form noValidate onSubmit={this.handleSubmit}>
                  <TextField
                    id="newPost"
                    name="newPost"
                    type="newPost"
                    label="Create a post!"
                    //className={classes.TextField}
                    // helperText={errors.email}
                    // error={errors.email ? true : false}
                    // value={this.state.email}
                    onChange={this.handleChange}
                    fullWidth
                  />
                  <br></br>
                  <br></br>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"

                  >
                    Create New Post!
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={7} xs={7}>
            {showPosts}
          </Grid>
        </Grid>
      </div>
    );
  }
}


home.propTypes = {
  createPost: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  createPost
};


export default connect(mapStateToProps, mapActionsToProps)(home);
//export default home
