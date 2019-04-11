import React from 'react';
import { Row, Col, Button } from 'react-materialize'
import { GoogleLogin } from 'react-google-login';

const LogIn = ({ handleLogIn }) => (
  <div className="container">
  <Row>
    <Col s={12}>
      <img src="/images/logo.png" />
    </Col>
  </Row>
  <Row>
    <Col s={12}>
      <Button onClick={handleLogIn} >Login with Google</Button>
      {/* <GoogleLogin
          clientId="895874481709-h8tt80hof6t6un9nb713lcs33g2m3v29.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={(response) => handleLogIn(response)}
          onFailure={(response) => console.log(response)}
          cookiePolicy={'single_host_origin'}
        /> */}
    </Col>
  </Row>
  </div>
);


export default LogIn;