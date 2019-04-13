import React from 'react';
import { Row, Col } from 'react-materialize'

const GroupCard = ({ club, book }) => {
  if (book && club) {
    return (
      <div className="card small groupcard">
        <Row>
          <h6 className="title">
            {club.name}
          </h6>
        </Row>
        <Row>
          <Col s={4} m={6} l={6} xl={6}>
            <img src={book.image} className="book" />
          </Col>
          <Col s={4} m={6} l={6} xl={6}>
            <div>"{book.title}"</div>
          </Col>
          <Col s={4} m={6} l={6} xl={6}>
            <div>{book.author}</div>
          </Col>
          <Col s={12} m={12} l={12} xl={12}>
            Next Meeting: {club.nextMeeting}
          </Col>
        </Row>
      </div>
    )
  } else {
    return (
      <div className="card small groupcard">
        Join some clubs!
      </div>
    )
  }
};


export default GroupCard;