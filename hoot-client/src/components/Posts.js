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
  render() {
      dayjs.extend(relativeTime)
    const {
      classes,
      posts: { body, commentCount, createdAt, likeCount, userImage, username },
    } = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.image}
          image={userImage}
          title="Profile pic"
          style={styles.image}
        />
        <img src={defaultLogo} alt="logo" width='100' height='150' style="border:3px solid black" />

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
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Posts);
