import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';


class NoticeList extends React.Component {
    constructor(props){
      super(props);
    //   this.state = {
    //       //empty
    //   };
    }
  
    // componentDidMount() {
    //
    // }
  
    render() {
      return (
        <div>
            <Container maxWidth="lg" className="main-container">
                공지글 리스트!!!!
            </Container>
        </div>
      );
    }
  }
  
  
  
  export default NoticeList;