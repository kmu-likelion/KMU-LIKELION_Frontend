import React from "react";
import JoinStore from "../joinStore";
import api from "../../../api/AdmissionAPI";

import moment from "moment";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";

class JoinFormSubmit extends React.Component {
  static contextType = JoinStore;

  state = {
    questions: [],
    answers: {}
  };

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions = async () => {
    await api.getAllQuestions().then(res => {
      console.log("eee", res.data);

      this.setState({
        questions: res.data.results
      });
    });
  };

  handlingChange = (event, id) => {
    const { value } = event.target;
    this.setState(prevState => {
      return { answers: { ...prevState.answers, [id]: value } };
    });
    // console.log(this.state.answers);
  };

  handlingSubmit = event => {
    event.preventDefault();
    // console.log("handlingSubmit 실행.");
    this.createJoinData();
  };

  createJoinData = async () => {
    await api
      .createJoinForm({
        name: this.context.name,
        phone_number: this.context.phoneNum,
        student_id: this.context.studentId,
        birth: moment(this.context.birth).format("YYYY-MM-DD"),
        sex: this.context.sex,
        major: this.context.major,
        email: this.context.email,
        pw: this.context.pw
      })
      .then(async res => {
        console.log("joinform이 정상적으로 생성됨.", res);
        let joinForm_id = res.data.id;
        this.createAnswer(this.state.answers, joinForm_id);
      })
      .catch(err => console.log(err));
  };

  createAnswer = async (answer_list, join_id) => {
    await api
      .createAnswers({
        answers: answer_list,
        application_id: join_id
      })
      .then(res => {
        console.log("생성된 답변 : ", res);
        alert("정상적으로 제출되었습니다! 지원내역에서 확인 가능함!");
        // this.props.history.push("/");
        document.location.href = "/";
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <>
        <h1>자기소개서</h1>
        질문에 해당하는 답변 냄겨
        <br />
        <br />
        <form onSubmit={event => this.handlingSubmit(event)}>
          {this.state.questions.map(elem => {
            const elemId = elem.id;
            return (
              <>
                <div key={elem.id}>
                  {elem.id}. {elem.body}
                </div>

                <InputLabel>A</InputLabel>
                <Input
                  id="component-simple"
                  value={this.state.answers.elemId}
                  onChange={e => this.handlingChange(e, elemId)}
                  required
                />
                <br />
                <br />
              </>
            );
          })}

          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
          <br />
          <br />
        </form>
      </>
    );
  }
}

export default JoinFormSubmit;
