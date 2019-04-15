import React from 'react';
import { Row, Col } from 'react-materialize';
import GroupCard from './GroupCard.jsx';

const BodyGrid = ({ chooseView, chooseClub, clubs }) => {
  if (clubs.length) {
    return (
      <div className="bodygrid cyan lighten-5">
        <Row>
          {clubs.map(club => (
            <Col
              s={12}
              m={12}
              l={6}
              xl={4}
              onClick={() => {
                chooseView('club view');
                chooseClub(club, club.book);
              }}
              className="cyan lighten-5"
              key={club.id}
            >
              <GroupCard club={club} book={club.book} />
            </Col>
          ))}
        </Row>
      </div>
    );
  } else {
    return <div className="bodygrid cyan lighten-5">Join some clubs!</div>;
  }
};

export default BodyGrid;
