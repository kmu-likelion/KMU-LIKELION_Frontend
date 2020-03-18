import React, { Component } from 'react'
import { Link } from "react-router-dom";
import api from "../../../api/GroupAPI";

import { withStyles, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GradeIcon from '@material-ui/icons/Grade';


const useStyles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});


class MyStudyGroup extends Component {
    state={
        MyStudyGroup:[]

    }

    componentDidMount(){
        this.getMyStudyGroup(this.props.id);
    }

    getMyStudyGroup = async (id) => {
        await api
          .getMyStudyGroup(id)
          .then(res => {
            this.setState({
                MyStudyGroup: res.data
            });
          })
          .catch(err => {
            console.log(err);
          });
      };

    render() {
      const {classes} = this.props;
        return (
            <>
              <Typography variant="h4">My StudyGroup</Typography>
              <hr/>
              <br/>

              <div className={classes.root}>
                {this.state.MyStudyGroup.map(item => (
                  <>
                  {
                    item.is_captain === true 
                      ? (
                        <ExpansionPanel>
                          <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Link to={`/study/${item.studygroup.name}`}>
                            <Typography className={classes.heading}><GradeIcon/> {item.studygroup.name}</Typography>
                            </Link>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            <Typography>
                              {item.studygroup.introduction}
                            </Typography>
                          </ExpansionPanelDetails>
                        </ExpansionPanel>
                      )
                      : (
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Link to={`/study/${item.studygroup.name}`}>
                              <Typography className={classes.heading}>{item.studygroup.name}</Typography>
                              </Link>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              <Typography>
                                {item.studygroup.introduction}
                              </Typography>
                            </ExpansionPanelDetails>
                          </ExpansionPanel>
                      )
                  }
                </>
              ))}
            </div>
          </>
        );
    }
}

export default withStyles(useStyles)(MyStudyGroup)