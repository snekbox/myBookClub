import React from 'react';
import { Row, Col, Icon, Button, Card } from 'react-materialize';

const Settings = ({ clubs, deleteGroup, leaveGroup, user }) => {
  if (clubs.length) {
    return (
      <div className="bodygrid blue-grey lighten-5">
        <Row>
          <Col s={6} className="blue-grey lighten-5">
            <Card >
              <Row className="cardtitle">
                <h5>Your Groups</h5>
              </Row>
              {clubs.map(club => (
                <Row key={club.id}>
                  <Col s={8}>{club.name}</Col>
                  <Col s={2}>
                    {club.userId == user.id ?
                    <Button
                      onClick={() => deleteGroup(club.id)}
                      floating
                      className="red accent-2"
                      waves="light"
                      icon="delete"
                      style={{ marginTop: 'auto' }}
                      tooltip="Delete group"
                      tooltipOptions={{ position: 'left' }}
                    />
                    :<Button
                      disabled
                      floating
                      icon="delete"
                      style={{ marginTop: 'auto' }}
                    />
                  }
                  </Col>
                  <Col s={2}>
                    <Button
                      onClick={() => leaveGroup(club.id)}   // This needs fixing.
                      floating
                      className="blue-grey darken-2"
                      style={{ marginTop: 'auto' }}
                      waves="light"
                      icon="remove"
                      tooltip="Leave group"
                      tooltipOptions={{ position: 'right' }}
                    />
                  </Col>
                </Row>
              ))}
            </Card>
          </Col>
          <Col s={6} className="blue-grey lighten-5">
            <Card >
              <Row className="cardtitle">
                <h5>Profile</h5>
              </Row>
              <Row>
                <Col s={5}>Username:</Col>
                <Col s={5}>{user.username}</Col>
                <Col s={2}>
                  <Icon>edit</Icon>
                </Col>
              </Row>
              <Row>
                <Col s={5}>Email:</Col>
                <Col s={5}>{user.email}</Col>
                <Col s={2}>
                  <Icon>edit</Icon>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    );
  } else {
    return (
      <div className="bodygrid blue-grey lighten-5">
        <Row>
          <Col s={6} className="blue-grey lighten-5">
            <div className="card large groupcard">
              <Row className="cardtitle">
                <h5>Your Groups</h5>
              </Row>
              <Row>Join some clubs!</Row>
            </div>
          </Col>
          <Col s={6} className="blue-grey lighten-5">
            <div className="card large groupcard">
              <Row className="cardtitle">
                <h5>Other Settings</h5>
              </Row>
              <Row>
                <Col s={8}>Setting 1</Col>
                <Col s={4}>
                  <Icon>checkbox</Icon>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
};

export default Settings;
