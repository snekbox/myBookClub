import React from 'react';
import { Row, Col } from 'react-materialize';

const GroupCard = ({ club, book }) => {
  if (book && club) {
    return (
      <div className="card medium groupcard">
        <Row>
          <Col>
            <h6 className="title">{club.name}</h6>
          </Col>
        </Row>
        <Row>
          <Col s={6} className="offset-s3">
            <img src={book.image} className="book responsive-img" alt="Book cover" />
          </Col>
        </Row>
        <Row>
          <Col className="title">
            {book.title}
          </Col>
        </Row>
        <Row>
          <Col>
            {book.author}
          </Col>
        </Row>
        <Row>
          <Col>
            Next Meeting: {club.nextMeeting || 'No meetings scheduled'}
          </Col>
        </Row>
      </div>
    );
  } else {
    return <div className="card small groupcard">Join some clubs!</div>;
  }
};

export default GroupCard;
