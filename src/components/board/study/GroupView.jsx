import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Card, CardContent, CardMedia, CardActionArea, CardActions } from "@material-ui/core";
import { withStyles, Typography, Button } from "@material-ui/core";

const useStyles = theme => ({
  root: {
    // maxWidth: 345
    // maxHeight: 350,
    width: "100%"
  },
  media: {
    // height: "auto"
    width: "100%"
  }
});

class GroupView extends Component {
  render() {
    const { classes } = this.props;
    const { name, introduction, img } = this.props;
    return (
      <Card className={classes.root}>
        <CardActionArea component={Link} to={`/study/${name}`}>
          <CardMedia
            className={classes.media}
            component="img"
            alt="Group image"
            // height="140"
            image={img}
            title="Group image"
          />
          <CardContent style={{height:'150px'}}>
            <Typography gutterBottom variant="h5">
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" style={{display:'block', height:'100px',  overflow:'hidden', textOverflow:'ellipsis'}}>
              {introduction}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" disabled>
            @KMU-LIKELION
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(useStyles)(GroupView);
