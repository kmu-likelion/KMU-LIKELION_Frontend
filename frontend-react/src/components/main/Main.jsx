import React from 'react';

import logo from './logo.png' 
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Carousel from 'react-bootstrap/Carousel'

class Main extends React.Component {
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
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                    <Carousel>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src={logo}
                            alt="logo"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src={logo}
                            alt="Second slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src={logo}
                            alt="Third slide"
                            />
                            <Carousel.Caption>
                                <h3>Third slide label</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                    </Grid>
                </Grid> 
                
            </Container>
        </div>
      );
    }
  }
  
  
  
  export default Main;
  