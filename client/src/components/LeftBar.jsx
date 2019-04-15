import React from 'react';
import GroupCard from './GroupCard.jsx'
import { Row, Col, CardPanel } from 'react-materialize'

const LeftBar = ({ club, book }) => (
  <div className="leftbar blue-grey lighten-3">
    <Row>
      <Col s={12}>
          <h5 className="white-text">
            Next Meeting
          </h5>
      </Col>
    </Row>
    <div className="card small">
      <GroupCard className="next-meeting" club={club} book={book} />
    </div>
  </div>
);


export default LeftBar;