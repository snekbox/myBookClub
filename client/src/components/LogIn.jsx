import React from 'react';
import { Row, Col } from 'react-materialize'
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
      <GoogleLogin
          clientId="832376083435-jk0sgf4ng8rsd3la3l2c92f7ccs36s2m.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={(response) => handleLogIn(response)}
          onFailure={(response) => console.error(response)}
          cookiePolicy={'single_host_origin'}
        />
    </Col>
  </Row>
  </div>
);


export default LogIn;