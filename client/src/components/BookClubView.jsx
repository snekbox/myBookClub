import React from 'react';
import { Row, Col, TextInput, Collection, CollectionItem, Card, Button, Modal, Icon } from 'react-materialize';

const BookClubView = ( { club, book, clubBookComment, clubBookComments, handleCommentText, submitComment } ) => (

    <div className="bodygrid cyan lighten-5">
    <Row>
        <Col s={12}>
            <Card header={<h3>{club.name}</h3>}>
                <h4>{book.title}</h4>
                <img src={book.image} />
                <article> {book.description} </article>
            </Card>
        </Col>
        {/* <Col>
            <h3>Calendar here</h3>
        </Col> */}
    </Row>
        <Row>
            <Col s={6}>
            <TextInput icon="chat" placeholder="your comment here" /> 
            <Button>Comment</Button>
            </Col>
        </Row>
        <Row>
            <Col s={12}>
                <Collection header="Comments">
                {/* clubBookComments
                clubBookComment
                handleCommentText
                submitComment */}
                {/* for each comment in the current group's state, 
                 collection item with comment text inside it 
               
               
                 implement a scroll bar so comments fit on page if many of them*/}
                 {clubBookComments.map((comment)=>{
                     return <CollectionItem>{comment}</CollectionItem>;
                 })}
                </Collection>
            </Col>
        </Row>
    </div>
)

export default BookClubView;


