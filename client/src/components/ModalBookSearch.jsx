import React from 'react';
import {
  Icon,
  Modal,
  TextInput,
  Button,
  Card,
  Row,
  Col,
} from 'react-materialize';

const ModalBookSearch = ({
  handleBookSearchInput,
  handleBookSearchSubmit,
  bookSearchResults,
  selectBook,
  bookSearchChoice,
}) => (
  <Modal
    fixedFooter
    header="select a book"
    trigger={
      !bookSearchChoice ?
        <Button className="blue-grey darken-2"> Select a book! </Button>
        : <Card>
          <Row>
            <h5>{bookSearchChoice.volumeInfo.title}</h5>
          </Row>
          <Row>
            <h6>{bookSearchChoice.volumeInfo.authors.join(', ')}</h6>
          </Row>
          <Row>
            <Col s={4}>
              <img src={bookSearchChoice.volumeInfo.imageLinks.smallThumbnail} className="book responsive-img" />
            </Col>
            <Col s={4}>
              {bookSearchChoice.volumeInfo.description.substring(0, 200)}
            </Col>
            <Col s={4}>
              <Button
                waves="light"
                onClick={() => selectBook(null)}
                large
                className="red accent-2 right modal-close"
                style={{ marginTop: 'auto' }}
              >
                Remove Book
              <Icon right>
                remove
              </Icon>
              </Button>
            </Col>
          </Row>
        </Card>
    }
  >
    <TextInput
      placeholder="search for books"
      onChange={e => handleBookSearchInput(e)}
    />
    <Button
      className="blue-grey darken-2"
      onClick={() => handleBookSearchSubmit()}
    >
      Search
      </Button>
    {bookSearchResults.length ?
      bookSearchResults.map(book => (
        <Card key={book.id}>
          <Row>
            <h5>{book.volumeInfo.title}</h5>
          </Row>
          <Row>
            <h6>{book.volumeInfo.authors.join(', ')}</h6>
          </Row>
          <Row>
            <Col s={4}>
              <img src={book.volumeInfo.imageLinks.smallThumbnail} className="book responsive-img" />
            </Col>
            <Col s={4}>
              {book.volumeInfo.description.substring(0, 200)}
            </Col>
            <Col s={4}>
              <Button
                waves="light"
                onClick={() => selectBook(book)}
                large
                className="blue-grey darken-2 right modal-close"
                style={{ marginTop: 'auto' }}
              >
                Select Book
              <Icon right>
                  add
              </Icon>
              </Button>
            </Col>
          </Row>
        </Card>
      )) :
      <div />
    }
  </Modal>
);

export default ModalBookSearch;
