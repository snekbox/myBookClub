import React from 'react';
import { Row, Col, Icon } from 'react-materialize';

const Settings = ({ }) => (
  <div className="bodygrid cyan lighten-5">
    <Row>
      <Col s={6} className="cyan lighten-5">
        <div className="card small groupcard">
          <Row className="cardtitle">
            <h5>
              Your Groups
            </h5>
          </Row>
          <Row>
            <Col s={8}>
              Quinn's Group
            </Col>
            <Col s={4}>
              <Icon>delete</Icon>
            </Col>
          </Row>
          <Row>
            <Col s={8}>
              Mark's Group
            </Col>
            <Col s={4}>
              <Icon>delete</Icon>
            </Col>
          </Row>
          <Row>
            <Col s={8}>
              Sam's Group
            </Col>
            <Col s={4}>
              <Icon>delete</Icon>
            </Col>
          </Row>
        </div>
      </Col>
      <Col s={6} className="cyan lighten-5">
        <div className="card small groupcard">
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
);


export default Settings;