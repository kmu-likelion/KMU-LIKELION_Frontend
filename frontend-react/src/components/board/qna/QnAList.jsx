import React from "react";
import Container from "@material-ui/core/Container";
// import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import api from "../../../api/BoardAPI";
import QnAView from "./QnAView";

class QnAList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qnaList: []
    };
  }

  componentDidMount() {
    this.getQnA();
  }

  async getQnA() {
    const _qnaList = await api.getAllPosts("qna");
    console.log("getqna 메서드 실행.");
    console.log(_qnaList);
    this.setState({ qnaList: _qnaList.data.results });
    // console.log('postList의 타입은 : ' , typeof(this.state.postList))
  }

  render() {
    return (
      <div>
        <Container maxWidth="lg" className="main-container">
          <h1>QnA List</h1>
          <h4>
            <Link to={"/QnA/new"}>New QnA</Link>
          </h4>
          <br />
          {this.state.qnaList.map(post => (
            <QnAView
              key={post.id}
              id={post.id}
              title={post.title}
              body={post.body}
              subject={post.subject}
            />
          ))}
        </Container>
      </div>
    );
  }
}

export default QnAList;
