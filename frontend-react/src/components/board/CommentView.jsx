import React, { Component } from "react";
import Button from "@material-ui/core/Button";
// import CardActions from '@material-ui/core/CardActions';
import api from "../../api/api_board";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";


export default class CommentView extends Component {
    state={
        is_update:false,
        input_cmt:""

    }
  
  componentDidMount() {

    
  }
  handlingChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  
  render() {
    const{user_id,author_name,body,comment_id,board_id, url}= this.props;
    if (this.state.is_update){
        return (
            <>
            작성자 :
            <Link to={`/Mypage/${user_id}`}>
              {author_name}
            </Link>
            
            
            <form onSubmit = {event => {
                this.setState({is_update:false});
                this.props.commentUpdateSubmit(event,this.state.input_cmt,board_id,user_id,comment_id)
                
                
                }} 
                className="commentForm">
                <TextField
                    id="outlined-name"
                    label="comment"
                    name="input_cmt"
                    value={this.state.input_cmt}
                    onChange={this.handlingChange}
                    margin="normal"
                    // variant="outlined"
                />
                <Button type="submit" variant="contained" color="primary">
                    제출
                </Button>
            </form>
        
            
    
                
             
    
            <Button
              color="primary"
              size="small"
              onClick={event =>
                this.setState({is_update:true})
                
              }
            >
              Update
            </Button>
    
            <Button
              color="secondary"
              size="small"
              onClick={event =>
                this.props.handlingDelete(url, comment_id)
              }
            >
              Delete
            </Button>
            <hr />
          </>
          );

    } else {
    return(
        <>
            작성자 :
            <Link to={`/Mypage/${user_id}`}>
              {author_name}
            </Link>
            
            <br/>
            <span>{body}</span>
            <br/>
              
            <Button
              color="primary"
              size="small"
              onClick={event =>
                this.setState({is_update:true, input_cmt:body})
                
              }
            >
              Update
            </Button>
    
            <Button
              color="secondary"
              size="small"
              onClick={event =>
                this.props.handlingDelete(url, comment_id)
              }
            >
              Delete
            </Button>
            <hr />
          </>
    );

      
    }
  }
}





