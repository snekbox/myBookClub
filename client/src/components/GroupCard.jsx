import React from 'react';
import { Row, Col } from 'react-materialize'

const GroupCard = ({ group }) => (
  <div className="card medium groupcard">
    <Row>
      <h5 className="title">
        Quinn's Group
      </h5>
    </Row>
    <Row>
      <Col s={6}>
        <img src="https://images.gr-assets.com/books/1488489522m/33574090.jpg" className="book"/>
      </Col>
      <Col s={6}>
        <div>"What the Hell Did I Just Read"</div>
        <div>David Wong</div>
      </Col>
    </Row>
    <Row>
      <Col s={12}>
        Next Meeting: Tuesday, April 29 / 7:30 PM
      </Col>
    </Row>
  </div>
);


export default GroupCard;