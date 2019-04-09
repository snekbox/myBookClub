import React from 'react';
import GroupCard from './GroupCard.jsx';
import { Row, Col } from 'react-materialize';

const BodyGrid = ({ }) => (
  <div className="bodygrid cyan lighten-5">
    <Row>
      <Col s={4} className="cyan lighten-5">
        <GroupCard />
      </Col>
      <Col s={4} className="cyan lighten-5">
        <GroupCard />
      </Col>
      <Col s={4} className="cyan lighten-5">
        <GroupCard />
      </Col>
    </Row>
    <Row>
      <Col s={4} className="cyan lighten-5">
        <GroupCard />
      </Col>
      <Col s={4} className="cyan lighten-5">
        <GroupCard />
      </Col>
      <Col s={4} className="cyan lighten-5">
        <GroupCard />
      </Col>
    </Row>
    <Row>
      <Col s={4} className="cyan lighten-5">
        <GroupCard />
      </Col>
      <Col s={4} className="cyan lighten-5">
        <GroupCard />
      </Col>
      <Col s={4} className="cyan lighten-5">
        <GroupCard />
      </Col>
    </Row>
  </div>
);


export default BodyGrid;