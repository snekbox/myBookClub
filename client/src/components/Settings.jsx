import React from 'react';
import { Row, Col, Icon } from 'react-materialize';

const Settings = ({ clubs }) => {
  if (clubs.length) {
    return (
    <div className="bodygrid cyan lighten-5">
      <Row>
        <Col s={6} className="cyan lighten-5">
          <div className="card large groupcard">
            <Row className="cardtitle">
              <h5>
                Your Groups
              </h5>
            </Row>
            {
                clubs.map(club => (
                  <Row>
                    <Col s={8}>
                      {club.name}
                    </Col>
                    <Col s={4}>
                      <Icon>delete</Icon>
                    </Col>
                  </Row>
                ))
            }
          </div>
        </Col>
        <Col s={6} className="cyan lighten-5">
          <div className="card large groupcard">
            <Row className="cardtitle">
              <h5>
                Other Settings
              </h5>
            </Row>
            <Row>
              <Col s={8}>
                Setting 1
              </Col>
              <Col s={4}>
                <Icon>checkbox</Icon>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
    )
  } else {
    return (
      <div className="bodygrid cyan lighten-5">
        <Row>
          <Col s={6} className="cyan lighten-5">
            <div className="card large groupcard">
              <Row className="cardtitle">
                <h5>
                  Your Groups
              </h5>
              </Row>
              <Row>
                Join some clubs!
              </Row>
            </div>
          </Col>
          <Col s={6} className="cyan lighten-5">
            <div className="card large groupcard">
              <Row className="cardtitle">
                <h5>
                  Other Settings
              </h5>
              </Row>
              <Row>
                <Col s={8}>
                  Setting 1
              </Col>
                <Col s={4}>
                  <Icon>checkbox</Icon>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
};


export default Settings;