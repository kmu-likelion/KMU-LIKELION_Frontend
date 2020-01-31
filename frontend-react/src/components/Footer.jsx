import React from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import lion_logo from './main/lion_logo.png'
import facebook_logo from './main/facebook_logo.png'

const Footer =  () => (
    <footer className="footer">
              <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item sm={3}>
                    </Grid>
                    <Grid item sm={2} className="left-footer">
                    <span><p>CONTACT</p></span>
                        <a href="https://likelion.net/"><img src={lion_logo} alt="lion로고" style={{width: '40%', padding: '5px;'}} /></a>
                        <a href="https://www.facebook.com/LikeLionKookmin/"><img src={facebook_logo} alt="페북로고" style={{width: '46%', padding: '5px'}} /></a>
                    </Grid>
                    <Grid item sm={7} className="right-footer">
                        <p>20707 서울특별시 성북구 정릉로 77 국민대학교</p>
                        <br/>
                        <p>Email kmu@likelion.org</p>
                        <p>COPYRIGHT © 2019 KOOKMIN-LIKELION.</p>
                        <p>ALL RIGHTS RESERVED</p>
                    </Grid>
                </Grid>
                <br/><br/>    
            </Container>   

    </footer>
)

export default Footer;