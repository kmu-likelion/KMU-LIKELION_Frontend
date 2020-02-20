import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Mentoring from "./MentoringManage";

class MentoringContainer extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <>
        <Container maxWidth="lg" className="PostingSection">
          <h1>멘토링 관리</h1>
          <hr /> <br />
          <Grid container spacing={2}>
            <Grid item xs={1} sm={3}></Grid>
            <Grid item xs={10} sm={6}>
              <h4>Mentor / Mentee</h4>
              <Mentoring />
            </Grid>
            <Grid item xs={1} sm={3}></Grid>
          </Grid>
        </Container>
      </>
    );
  }
}

export default MentoringContainer;
