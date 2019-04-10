import React from 'react';
import { Row, Col, TextInput, Collection, CollectionItem, Card, Pagination, DatePicker } from 'react-materialize';
const data = require('../../../database/sample-data/sample.js');
const BookClubView = ( { } ) => (
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

    <div className="bodygrid cyan lighten-5">
    <Row>
        <Col m={6} s={12}>
            <Card header={<h1>Club View</h1>}>
                <h2>Book Being Discussed</h2>
                <article> Book info here </article>
            </Card>
        </Col>
        <Col>
            <h3>Calendar here</h3>
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


