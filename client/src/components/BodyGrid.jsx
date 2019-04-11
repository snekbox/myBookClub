import React from 'react';
import GroupCard from './GroupCard.jsx';
import { Row, Col } from 'react-materialize';

const BodyGrid = ({ chooseView, clubs, books }) => (
  <div className="bodygrid cyan lighten-5">
    <Row>
      {
        clubs.map( (club, index) => (
          <Col s={12} m={12} l={6} xl={3} onClick={() => { chooseView('club view') }} className="cyan lighten-5" key={club.id}>
            <GroupCard club={club} book={books[index]} />
          </Col>
        ))
      }
    </Row>
  </div>
);


export default BodyGrid;