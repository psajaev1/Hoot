import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Link from "react-router-dom/Link";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
    height: 0,
  },
  content: {
    padding: 50,
    objectFit: "cover",
  },
};
export class Profile extends Component {
  render() {
      dayjs.extend(relativeTime)
    const {
      classes,
      profile: { username, imageUrl},
    } = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.image}
          image={imageUrl}
          title="Profile pic"
          style={styles.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            color="primary"
            component={Link}
            to={`/profile/${username}`}
          >
            {username}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Profile);
