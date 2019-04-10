import React from 'react';
import GroupCard from './GroupCard.jsx';
import { Row, Col } from 'react-materialize';

const BodyGrid = ({ chooseView }) => (
  <div className="bodygrid cyan lighten-5">
    <Row>
      <Col s={4} onClick={ ()=>{ chooseView('club view') } } className="cyan lighten-5">
        <GroupCard />
      </Col>
      <Col s={4} onClick={ ()=>{ chooseView('club view') } } className="cyan lighten-5">
        <GroupCard />
      </Col>
      <Col s={4} onClick={ ()=>{ chooseView('club view') } } className="cyan lighten-5">
        <GroupCard />
      </Col>
    </Row>
    <Row>
      <Col s={4} onClick={ ()=>{ chooseView('club view') } } className="cyan lighten-5">
        <GroupCard />
      </Col>
      <Col s={4} onClick={ ()=>{ chooseView('club view') } } className="cyan lighten-5">
        <GroupCard />
      </Col>
      <Col s={4} onClick={ ()=>{ chooseView('club view') } } className="cyan lighten-5">
        <GroupCard />
      </Col>
    </Row>
    <Row>
      <Col s={4} onClick={ ()=>{ chooseView('club view') } } className="cyan lighten-5">
        <GroupCard />
      </Col>
      <Col s={4} onClick={ ()=>{ chooseView('club view') } } className="cyan lighten-5">
        <GroupCard />
      </Col>
      <Col s={4} onClick={ ()=>{ chooseView('club view') } } className="cyan lighten-5">
        <GroupCard />
      </Col>
    </Row>
  </div>
);


export default BodyGrid;