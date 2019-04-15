import React from 'react';
import {
  Row,
  Col,
  TextInput,
  Collection,
  CollectionItem,
  Card,
  Button,
  Icon,
  Modal,
  CardPanel,
} from 'react-materialize';

const BookClubView = ({
  club,
  book,
  userList,
  user,
  addBookToGroup,
  handleBookSearchInput,
  handleBookSearchSubmit,
  bookSearchResults,
  clubBookComments,
  handleCommentText,
  submitComment
} ) => (
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
        <Row>
          <Col s={8} className="offset-s2">
          {
            user.id == club.userId ?
                  <Modal
                    fixedFooter
                    header="select a book"
                    trigger={
                        <Button className="blue-grey darken-2">
                          Change Book
                          <Icon right>edit</Icon>
                        </Button>
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
                                onClick={() => addBookToGroup(club.id, book)}
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
            :<Button disabled>
              Change Book
              <Icon right>close</Icon>
            </Button>
          }
          </Col>
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
      <Modal trigger={
          <Button>Add A Comment!</Button>
        }>
        <TextInput icon="chat" placeholder="your comment here" onChange={(input)=>{ handleCommentText(input) }} /> 
              <Button className="modal-close" onClick={ submitComment }  >Add Comment</Button> 
      </Modal>
      </Col>
      <Col s={6}>
        <h5>Comments</h5>
      </Col>
    </Row>
    <Row>
      <Col s={12}>
      <div className='commentsSection'>
            <Collection>
                 {clubBookComments.map((comment)=>{ 
                     return <CollectionItem 
                     key={comment.id}
                     
                     > 
                     <CardPanel>
                       <Row>
                         <Col s={4}>
                     {`${comment.user.username}:`}
                         </Col>
                       </Row>
                       <Row>
                         <Col s={12}>
                      {`${comment.comment}`}
                         </Col>
                       </Row>
                       <Row>
                         <Col s={6} className='offset-s7'>
                         {`${new Date(comment.createdAt).toString().slice(0, 15)} at ${new Date(comment.createdAt).toLocaleTimeString()} `}
                         </Col>
                       </Row>
                     </CardPanel>
                     </CollectionItem>
                 })}
                </Collection>
      </div>
      </Col>
    </Row>
  </div>
)

export default BookClubView;