import React from 'react';
import { Row, Col, Icon } from 'react-materialize';

const GroupCard = ({ club, book, userId }) => {
  if (book && club) {
    return (
      <div className="card large groupcard">
        <Row>
          <Col s={10}>
            <h6 className="title">{club.name}</h6>
          </Col>
          {
            userId == club.userId ?
            <Col s={1}>
              <Icon left className="blue-text text-lighten-2 ownericon">
                how_to_reg
              </Icon>
            </Col>
            :<Col s={2} />
          }
        </Row>
        <Row>
          <Col s={6} className="offset-s3">
            <img src={book.image} className="book responsive-img" alt="Book cover" />
          </Col>
        </Row>
        <Row>
          <Col className="title">
            Current Book: "{book.title}"
          </Col>
        </Row>
        <Row>
          <Col>
            By: {book.author}
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
