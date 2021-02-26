import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Posts from "../components/Posts";
import Profile from "../components/Profile";
import networkLogo from '../images/Networks.jpg'


export class home extends Component {
  state = {
    posts: null,
  };

  componentDidMount() {
    axios
      .get("/Posts")
      .then((res) => {
        this.setState({
          posts: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    let showPosts = this.state.posts ? (
      this.state.posts.map((posts) => (
        <Posts key={posts.username} posts={posts} />
      ))
    ) : (
      <p> loading</p>
    );

    return (
      <div style={{ backgroundColor: "#cceeff", width: "1000px", minHeight: "2000px", margin: "100px"}}>
      <img 
        src={networkLogo}
        alt="HTML5" 
        style={{width: 260, height: 1000, position: 'absolute', top: 0, left: 1260}}/>

      <img 
        src={networkLogo}
        alt="HTML5" 
        style={{width: 260, height: 1000, position: 'absolute', top: 0, left: 0}}/>
      
      <Grid container spacing={10}>
        <Grid item sm={4} xs={12}>
            TODO: User Account Information
        </Grid>
        <Grid item sm={8} xs={12}>
          {showPosts}
        </Grid>
      </Grid>
    );
  }
}

export default home;
