import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    display: "flex",
  },
};
export class Posts extends Component {
  render() {
    const {
      classes,
      posts: { body, commentCount, createdAt, likeCount, userImage, username },
    } = this.props;
    return (
      <Card>
        <CardMedia image={userImage} title="Profile pic" />
        <CardContent>
        <Typography variant="h5">{username}</Typography>
        <Typography variant="body2">{createdAt}</Typography>
        <Typography variant="body1">{body}</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Posts);
