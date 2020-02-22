import React from "react";
import Container from "@material-ui/core/Container";
// import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import api from "../../../api/BoardAPI";
import PostView from "./PostView";

class CareerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      careerList: []
    };
  }

  componentDidMount() {
    this.getNotices();
  }

  async getNotices() {
    const _careerList = await api.getAllPosts("career");

    console.log("getcareer 메서드 실행.");
    console.log(_careerList);
    this.setState({ careerList: _careerList.data.results });
    // console.log('postList의 타입은 : ' , typeof(this.state.postList))
  }

  render() {
    return (
      <div>
        <Container maxWidth="lg" className="main-container">
          <h1>Career List</h1>
          <h4>
            <Link to={"/career/new"}>New Career</Link>
          </h4>
          <br />
          {this.state.careerList.map(post => (
            <PostView
              key={post.id}
              id={post.id}
              title={post.title}
              body={post.body}
            />
          ))}
        </Container>
      </div>
    );
  }
}

export default CareerList;
