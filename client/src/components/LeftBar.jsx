import React from 'react';
import GroupCard from './GroupCard.jsx'
import { Row, Col, CardPanel } from 'react-materialize'

const LeftBar = ({ club, book, chooseClub, chooseView }) => (
  <div className="leftbar blue-grey lighten-3">
    <Row>
      <Col s={12}>
          <h5 className="white-text">
            Next Meeting
          </h5>
      </Col>
    </Row>
    <Col>
      <GroupCard className="next-meeting"
        club={club} 
        book={book}
        onClick={() => {
          chooseView('club view');
          chooseClub(club, book);
        }
      }/>
    </Col>
  </div>
);


export default LeftBar;