import React from "react";
// import { Link } from "react-router-dom";
// import api from "../../../api/BoardAPI";

// import { Paper, List, ListItem, ListItemText, ListSubheader, withStyles } from "@material-ui/core";
import { Paper, withStyles } from "@material-ui/core";

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
  componentDidMount() {}

  render() {
    // const { classes } = this.props;
    return (
      <Paper elevation={10}>
        <></>
      </Paper>
    );
  }
}

export default withStyles(useStyles)(MySubmission);
