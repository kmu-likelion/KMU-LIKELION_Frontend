import React, { Component } from "react";
import { Link } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const useStyles = theme => ({
  root: {
    // maxWidth: 345
    // maxHeight: 350
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
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
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
