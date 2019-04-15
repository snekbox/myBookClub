import React from 'react';
import { Row, Col } from 'react-materialize';
import GroupCard from './GroupCard.jsx';

const BodyGrid = ({ chooseView, chooseClub, clubs, userId, getGroupComments }) => {
  if (clubs.length) {
    return (
      <div className="bodygrid blue-grey lighten-5">
        <Row>
          {clubs.map(club => (
            <Col
              s={12}
              m={12}
              l={6}
              xl={4}
              onClick={() => {
                //need to render current comments on click
                chooseView('club view');
                chooseClub(club, club.book);
                getGroupComments(club, club.book);
              }}
              className="blue-grey lighten-5"
              key={club.id}
            >
              <GroupCard club={club} book={club.book} userId={userId} />
            </Col>
          ))}
        </Row>
      </div>
    );
  } else {
    return <div className="bodygrid blue-grey lighten-5">Join some clubs!</div>;
  }
};

export default BodyGrid;
