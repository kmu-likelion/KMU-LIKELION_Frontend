import React, { useState, useContext, useEffect } from "react";
import JoinStore from "./joinStore";
import api from "../../api/api_admission";

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

  const appli_info = useContext(JoinStore);
  useEffect(() => {
    console.log("실행됬는데말이야..", appli_info);
    getQuestions();
  }, []);

  const getQuestions = async () => {
    await api.getAllQuestions().then(res => {
      console.log(res.data);
      const results = res.data;
      //   const question_list = [];

      //   for (let i = 0; i < results.length; i++) {
      //     console.log(results[i]);
      //     question_list.push(results[i].body);
      //   }
      setQuestions(results);
    });
  };
  const handlingSubmit = () => {
    console.log("submit 실행.");
  };
  const createJoinData = () => {
    console.log("create joindata 실행.");
  };
  const createAnswer = () => {
    console.log("create answer 실행.");
  };
  return (
    <div>
      <h2>Join submit</h2>
      list:{appli_info.infolist}
      name:{appli_info.infolist.name}
      <form onSubmit={handlingSubmit}>
        <ul>
          {questions.map(elem => {
            return (
              <li key={elem.id}>
                {elem.id}:{elem.body}
              </li>
            );
          })}
        </ul>
      </form>
    </div>
  );
}
