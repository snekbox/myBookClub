import React from 'react';
import GroupCard from './GroupCard.jsx'
import { Row, Col, CardPanel } from 'react-materialize'

const LeftBar = ({ club, book }) => (
  <div className="leftbar cyan lighten-3">
    <Row>
      <Col s={12}>
        <CardPanel className="teal">
          <span className="white-text">
            Next Meeting
          </span>
        </CardPanel>
      </Col>
    </Row>
    <div className="card small">
      <GroupCard className="next-meeting" club={club} book={book} />
    </div>
  </div>
);


export default LeftBar;