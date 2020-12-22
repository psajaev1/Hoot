import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Link from "react-router-dom/Link";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 50,
    objectFit: "cover",
  },
};
export class Posts extends Component {
  render() {
    const {
      classes,
      posts: { body, commentCount, createdAt, likeCount, userImage, username },
    } = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile pic"
          className={classes.image}
        />
        <CardContent class={classes.content}>
          <Typography variant="h5" color="primary" component={Link} to={`/users/${username}`}>
            {username} 
          </Typography>
          <Typography variant="body2">{createdAt}</Typography>
          <Typography variant="body1">{body}</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Posts);
