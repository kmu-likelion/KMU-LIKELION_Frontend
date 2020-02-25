import React, { Component } from 'react'
import Paper from "@material-ui/core/Paper";
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Button from "@material-ui/core/Button";
import api from "../../../api/GroupAPI";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GradeIcon from '@material-ui/icons/Grade';
import { Link } from "react-router-dom";

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
            <Paper elevation={10} className="MyStudyGroup">
              <h1>My StudyGroup</h1>
              <hr/>
              <br/>
              <div className={classes.root}>
              {this.state.MyStudyGroup.map(item => (
                <>
                <div>
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
                            <Typography className={classes.heading}>{item.studygroup.name}</Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            <Typography>
                              {item.studygroup.introduction}
                            </Typography>
                          </ExpansionPanelDetails>
                        </ExpansionPanel>
                    )
                }
                </div>
                </>
            ))}
            </div>
              
            </Paper>
                
        );
    }
}

export default withStyles(useStyles)(MyStudyGroup)