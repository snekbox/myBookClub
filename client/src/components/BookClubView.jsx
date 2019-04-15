import React from 'react';
import { Row, Col, TextInput, Collection, CollectionItem, Card, Button, Modal, Icon } from 'react-materialize';

const BookClubView = ( { club, book, clubBookComments, handleCommentText, submitComment } ) => (

    <div className="bodygrid blue-grey lighten-5">
    <Row>
        <Col s={12}>
            <Card header={<h3>{club.name}</h3>}>
                <h4>{book.title}</h4>
                <img src={book.image} />
                <article> {book.description} </article>
            </Card>
        </Col>
    </Row>
        <Row>
            <Col s={6}>
            <TextInput icon="chat" placeholder="your comment here" onChange={(input)=>{ handleCommentText(input) }} /> 
            <Button onClick={ submitComment } >Add Comment</Button>
            </Col>
        </Row>
        <Row>
            <Col s={12}>
                <Collection header="Comments">
                 {clubBookComments.map((comment)=>{
                     return <CollectionItem>{comment}</CollectionItem>
                 })}
                </Collection>
            </Col>
        </Row>
    </div>
)

export default BookClubView;


