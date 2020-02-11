import React, { useState, useContext, useEffect } from "react";
import JoinStore from "./joinStore";
import api from "../../api/api_admission";

import moment from "moment";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";

export default function JoinFormSubmit() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  const appli_info = useContext(JoinStore);

  useEffect(() => {
    // console.log("자기소개서 폼 실행.", appli_info);
    getQuestions();
  }, []);

  useEffect(() => {
    console.log("답변 : ", answers);
  }, [answers]);

  const getQuestions = async () => {
    await api.getAllQuestions().then(res => {
      console.log(res.data);
      const results = res.data;

      setQuestions(results);
    });
  };

  const handlingChange = (event, id) => {
    const { value } = event.target;
    setAnswers(prevAnswers => ({ ...prevAnswers, [id]: value }));
  };

  const handlingSubmit = event => {
    event.preventDefault();
    // console.log("handlingSubmit 실행.");
    createJoinData();
  };

  const createJoinData = async () => {
    await api
      .createJoinForm({
        name: appli_info.name,
        phone_number: appli_info.phoneNum,
        student_id: appli_info.studentId,
        birth: moment(appli_info.birth).format("YYYY-MM-DD"),
        sex: appli_info.sex,
        major: appli_info.major,
        email: appli_info.email,
        pw: appli_info.pw
      })
      .then(async res => {
        console.log("joinform이 정상적으로 생성됨.", res);
        let joinForm_id = res.data.id;
        let answer_list = {};

        for (let idx = 1; idx < questions.length + 1; ++idx) {
          //답변들을 딕셔너리형으로 리스트에 담아줌.
          answer_list[idx] = answers[idx];
        }
        createAnswer(answer_list, joinForm_id);
      })
      .catch(err => console.log(err));
  };

  const createAnswer = async (answer_list, join_id) => {
    await api
      .createAnswers({
        answers: answer_list,
        joinform_id: join_id
      })
      .then(res => {
        console.log("생성된 답변 : ", res);
        alert("정상적으로 제출되었습니다! 지원내역에서 확인 가능함!");
        // this.props.history.push("/");
        document.location.href = "/";
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <h1>자기소개서</h1>
      질문에 해당하는 답변 냄겨
      <br />
      <br />
      <form onSubmit={handlingSubmit}>
        {questions.map(elem => {
          const elemId = elem.id;
          return (
            <>
              <div key={elem.id}>
                {elem.id}. {elem.body}
              </div>

              <InputLabel>A</InputLabel>
              <Input
                id="component-simple"
                value={answers.elemId}
                onChange={e => handlingChange(e, elemId)}
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
