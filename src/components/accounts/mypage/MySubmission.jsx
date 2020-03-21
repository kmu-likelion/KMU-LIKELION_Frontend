import React from "react";
// import { Link } from "react-router-dom";
// import api from "../../../api/BoardAPI";

import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  withStyles
} from "@material-ui/core";

const useStyles = theme => ({
  root: {
    width: "100%",
    maxWidth: 750,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 500
  }
});

class MySubmission extends React.Component {
  state = {};

  render() {
    // const { classes } = this.props;
    return (
      <>
        <Typography variant="h4">My Submission</Typography>
        <hr />
        <br />
      </>
    );
  }
}

export default withStyles(useStyles)(MySubmission);
