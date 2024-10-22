import React, { Component } from "react";

import { updateUser, getUserWithId } from "../../../api/AuthAPI";

import { Paper, Typography, MenuItem, MenuList, ListItemIcon } from "@material-ui/core"
import EditIcon from '@material-ui/icons/Edit';
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import AssignmentIcon from "@material-ui/icons/Assignment";


export default class LeftProfileView extends Component {
  state={
    img:null,
    userId:"",
    username:"",
    first_name:"",
    email:"",
    major:"",
    student_id:"",
    user_type:"",
    start_number:"",
    sns_id:"",
    modalFlag: false
  }
  componentDidMount(){
    this.getUserWithId();
  }
  handleFileInput(e){
    this.setState({
      img : e.target.files[0],
    })
  }
  getUserWithId = async () => {
    await getUserWithId(window.sessionStorage.getItem("id"))
      .then(res => {
        const userInfo = res.data;
        this.setState({
          userId: userInfo.id,
          username: userInfo.username,
          first_name: userInfo.first_name,
          email: userInfo.email,
          major: userInfo.major,
          student_id: userInfo.student_id,
          user_type: userInfo.user_type,
          start_number: userInfo.start_number,
          sns_id: userInfo.sns_id
        });
      })
      .catch(err => console.log(err));
  };

  updateUserImage = async (e)  => {
    const formData = new FormData();
    formData.append('username', this.state.username);
    formData.append('first_name', this.state.first_name);
    formData.append('img', this.state.img);
    formData.append('id',  this.state.userId);
    formData.append('email', this.state.email);
    formData.append('major', this.state.major);
    formData.append('student_id', this.state.student_id);
    formData.append('user_type', this.state.user_type);
    formData.append('start_number', this.state.start_number);
    formData.append('sns_id', this.state.sns_id);

    const config = {
      headers:{
        'content-type':'multipart/form-data'
      }
    }

    await updateUser(window.sessionStorage.getItem("id"), formData, config)
      .then(res => {

        const userData = res.data;
        console.log("userData! ", res.data);
        this.setState({
          img: userData.img,
        });
        window.sessionStorage.setItem("user_img", userData.img);
        this.getUserWithId();
        ('#myModal').modal('hide')
      })
      .catch(err => console.log(err));
  };
  refreshPage() {
    window.location.reload(false);
  }

  render() {
    const { username, sns_id, user_img } = this.props;

    return (
      <Paper elevation={10} className="LeftProfile">
        <div>
          <img
            src={user_img}
            alt="Myprofile"
            style={{ width: "70%", padding: "10px", borderRadius: '20px' }}
          />
          <br />
          {username === window.sessionStorage.getItem("username")
          ?(<EditIcon type="button" data-toggle="modal" data-target="#exampleModal">
          </EditIcon>)
          :(
            <></>
          )}
          <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">프로필사진 수정</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <input type="file" name="file" onChange={e=> this.handleFileInput(e)}/>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">닫기</button>
                  <button type="button" className="btn btn-primary" onClick={e=>{this.updateUserImage(); this.refreshPage()}}>변경하기</button>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <h1>{username}</h1>
          <h5>@{sns_id}</h5>
          <br />
        </div>

        <MenuList>
          <hr />
          <MenuItem
            onClick={event => this.props.handlingSubmit(event, "Myprofile")}
          >
            <ListItemIcon>
              <SendIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">내 프로필</Typography>
          </MenuItem>

          {username === window.sessionStorage.getItem("username")
          ?(
            <div>
            <MenuItem
              onClick={event => this.props.handlingSubmit(event, "MySubmission")}
            >
              <ListItemIcon>
                <AssignmentIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">나의 과제 제출물</Typography>
            </MenuItem>

            <MenuItem
            onClick={event => this.props.handlingSubmit(event, "MyLike")}
          >
            <ListItemIcon>
              <PriorityHighIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">내가 좋아요 한 글</Typography>
          </MenuItem>
          </div>
          ):( <span></span> )}

          <MenuItem
            onClick={event => this.props.handlingSubmit(event, "MyPost")}
          >
            <ListItemIcon>
              <DraftsIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit" noWrap>
              내가 쓴 글
            </Typography>
          </MenuItem>

          <MenuItem
            onClick={event => this.props.handlingSubmit(event, "MyComment")}
          >
            <ListItemIcon>
              <DraftsIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit" noWrap>
              내가 쓴 댓글
            </Typography>
          </MenuItem>

          <MenuItem
            onClick={event => this.props.handlingSubmit(event, "MyMentoring")}
          >
            <ListItemIcon>
              <DraftsIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit" noWrap>
              나의 멘토멘티
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={event => this.props.handlingSubmit(event, "MyStudyGroup")}
          >
            <ListItemIcon>
              <DraftsIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit" noWrap>
              내 스터디 그룹
            </Typography>
          </MenuItem>
        </MenuList>
      </Paper>
    );
  }
}
