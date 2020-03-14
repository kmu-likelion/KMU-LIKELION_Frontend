import React from "react";
// import { Link } from "react-router-dom";
import likelion_logo from "../static/LIKELION_LOGO.png";
// import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
class NotFoundPage extends React.Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          padding: 50
        }}
      >
        <img
          src={likelion_logo}
          style={{ margin: "auto", width: "20rem", marginBottom: 40 }}
        />
        <Typography variant="h1">404</Typography>
        <Typography variant="h4">페이지를 찾을 수 없습니다</Typography>
      </div>
    );
  }
}
export default NotFoundPage;
