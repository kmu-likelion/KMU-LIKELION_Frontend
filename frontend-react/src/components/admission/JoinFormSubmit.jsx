import React, { useState, useContext, useEffect } from "react";
import JoinStore from "./joinStore";
import api from "../../api/api_admission";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
// class JoinFormSubmit extends React.Component {

//   handleChange = prop => event => {
//     this.setState({ [prop]: event.target.value });
//   };

//   render() {
//       return ()
//   }
// }
// export default JoinFormSubmit;

export default function JoinFormSubmit() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [joinId, setJoinId] = useState();

  const appli_info = useContext(JoinStore);

  useEffect(() => {
    console.log("자기소개서 폼 실행.", appli_info);
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
    console.log("submit 실행.");
    // createJoinData().then(joinId => {
    //   for (let idx = 1; idx < questions.length - 1; ++idx) {
    //     //해당 idx는 question ID 이기도 함.
    //     console.log("받아온 :", joinId);
    //     createAnswer(answers[idx], idx, joinId);
    //   }
    // });
    createJoinData();

    // console.log("ans size :", questions.length);
  };

  const createJoinData = async () => {
    console.log("보내기 전 정보:", appli_info);
    await api
      .createJoinForm({
        name: appli_info.name,
        phone_number: appli_info.phoneNum,
        student_id: appli_info.studentId,
        birth: "2020-02-11",
        sex: appli_info.sex,
        major: appli_info.major,
        email: appli_info.email,
        pw: "1234"
      })
      .then(async res => {
        console.log("joinform이 정상적으로 생성됨.");
        console.log(res);
        let joinForm_id = res.data.id;
        console.log("생성된 조인폼 ID : ", joinForm_id);

        for (let idx = 1; idx < questions.length - 1; ++idx) {
          //해당 idx는 question ID 이기도 함.
          createAnswer(answers[idx], idx, joinForm_id);
        }
      })
      .catch(err => console.log(err));
  };

  const createAnswer = async (answer, qus_id, join_id) => {
    console.log("create answer 실행.");
    // console.log("ans : ", answer);
    // console.log("qus : ", qus_id);
    // console.log("join_idfdf : ", join_id);
    await api
      .createAnswer({
        body: answer,
        joinform_id: join_id,
        question_id: qus_id
      })
      .then(res => {
        console.log("생성된 답변 : ", res);
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
