import React from 'react';
import {
  Row,
  Col,
  TextInput,
  Collection,
  CollectionItem,
  Card,
  Pagination,
  DatePicker,
  Icon
} from 'react-materialize';
//const data = require('../../../database/sample-data/sample.js');
const BookClubView = ( { club, book, userList } ) => (
  //0. renders this component when a book club is clicked
  //1.on render, shows book title on top center of page
  //2.on render, shows picture of book in top left of page
  //3.on render, shows top X number of messages that fit the page
  // in an aesthetically pleasing way
  //4. Calendar --> button renders an embedded google calendar
  //5. Message board (might be separate component, but the one for 
  //this book needs to render so people can discuss)
  //6. show X choices for next book, ability to vote
  //7. vote on next book component
  //8. Link to embedded video chat page, tokbox
  //9. click on book in top-right or a specific button, 
  //pulls up public book notes, including username, message/note, time
  //10. X...

  <div className="bodygrid blue-grey lighten-5">
  <Row>
    <Col s={12} xl={6}>
        <Card header={<h4 className="header">{club.name}</h4>}>
        <Row>
          <h5>{book.title}</h5>
        </Row>
        <Row>
          <Col s={6} className="offset-s3">
            <img src={book.image} className="book responsive-img" alt="Book cover" />
          </Col>
        </Row>
        <Row>
          <article> {book.description} </article>
        </Row>
      </Card>
    </Col>
    <Col s={12} xl={6}>
      <Card header={<h4 className="header">Members:</h4>} >
        {
          userList.map(user =>(
            user.id == club.userId ?
              <Row key={user.id}>
                <Col s={10}> {user.username} </Col>
                <Col s={2} ><Icon left className="blue-text text-lighten-2 ownericon">how_to_reg</Icon></Col>
              </Row>
              : <Row key={user.id}>
                <Col s={10}> {user.username} </Col>
              </Row>
          ))
        }
      </Card>
    </Col>
  </Row>
    <Row>
      <Col s={6}>
      <h4> Add Comment</h4>
      <TextInput icon="chat" placeholder="your comment here" /> 
      </Col>
    </Row>
    <Row>
      <Col s={12}>
        <Collection header="Comments List">
          <CollectionItem>
            'I am a comment'
          </CollectionItem>
          <CollectionItem>
            'I am another comment'
          </CollectionItem>
          <Pagination maxButtons={10} />
        </Collection>
      </Col>
    </Row>
  </div>
)

export default BookClubView;


