import React from "react";
import api from "../../api/MentoringAPI";
import { getAllUser } from "../../api/AuthAPI";

import MentorManage from "./MentorManage";
import MenteeManage from "./MenteeManage";
import MentoringAdd from "./MentoringAdd";

class MentoringManage extends React.Component {
  state = {
    allUser: [],
    allMentor: [],
    allMentee: [],
    linkedMentor: [],
    linkedMentee: []
  };
  componentDidMount() {
    this.getAllUser();
    this.getAllMentor();
    this.getAllMentee();
  }
  getAllUser = async () => {
    await getAllUser().then(res => {
      console.log("모든 유저 받아옴", res.data);
      this.setState({
        allUser: res.data
      });
    });
  };

  getAllMentor = async () => {
    await api
      .getAllMentor()
      .then(res => {
        console.log("멘토데이터 받아옴", res.data);
        this.setState({
          allMentor: res.data,
          linkedMentor: [],
          linkedMentee: []
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getAllMentee = async () => {
    await api
      .getAllMentee()
      .then(res => {
        console.log("멘티데이터 받아옴", res.data);
        this.setState({
          allMentee: res.data,
          linkedMentor: [],
          linkedMentee: []
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getLinkedMentor = async id => {
    await api
      .getLinkedMentor(id)
      .then(res => {
        this.setState({
          linkedMentor: []
        });
        console.log("연결된 멘토데이터 받아옴", res.data);
        this.setState({
          linkedMentor: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getLinkedMentee = async id => {
    await api
      .getLinkedMentee(id)
      .then(res => {
        this.setState({
          linkedMentee: []
        });
        console.log("연결된 멘티데이터 받아옴", res.data);
        this.setState({
          linkedMentee: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  deleteMentoring = async (mentorId, menteeId) => {
    await api
      .deleteMentoring({
        mentor_id: mentorId,
        mentee_id: menteeId
      })
      .then(res => {
        console.log("정상적으로 삭제됨");
        this.getLinkedMentee(mentorId);
        this.getLinkedMentor(menteeId);
        this.getAllMentor();
        this.getAllMentee();
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item">
            <a
              class="nav-link active"
              id="home-tab"
              data-toggle="tab"
              href="#home"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              Mentor
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              id="profile-tab"
              data-toggle="tab"
              href="#profile"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              Mentee
            </a>
          </li>
        </ul>

        <div class="tab-content" id="myTabContent">
          <div
            class="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <MentorManage
              allMentor={this.state.allMentor}
              linkedMentee={this.state.linkedMentee}
              deleteMentoring={this.deleteMentoring}
              getLinkedMentee={this.getLinkedMentee}
            />
          </div>
          <div
            class="tab-pane fade"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <MenteeManage
              allMentee={this.state.allMentee}
              linkedMentor={this.state.linkedMentor}
              deleteMentoring={this.deleteMentoring}
              getLinkedMentor={this.getLinkedMentor}
            />
          </div>
        </div>

        <div>
          <MentoringAdd
            allUser={this.state.allUser}
            getAllMentor={this.getAllMentor}
            getAllMentee={this.getAllMentee}
            getLinkedMentee={this.getLinkedMentee}
            getLinkedMentor={this.getLinkedMentor}
          />
        </div>
      </>
    );
  }
}

export default MentoringManage;
