import React from 'react';
import { Row, Col, Button, Icon, TextInput, Collection, CollectionItem, Card } from 'react-materialize';
const data = require('../../../database/sample-data/sample.js');
const BookClubView = ( { } ) => (
    console.log(data.json.items[0]),
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
    //onChange={ /** when user presses enter OR clicks chat icon to the left of input box, message is added */}

    <div className="bodygrid cyan lighten-5">
    <Row>
        <Col m={6} s={12}>
            <Card header={<h1>Book Title</h1>}>
                Here is the standard card with a horizontal image.
            </Card>
        </Col>
    </Row>
       {/* <Row>
           
           <Col s={6}>
        <Button className="btn waves-effect waves-light" style={{marginRight: '5px'}}> Calendar 
            <Icon right> 
            date_range
            </Icon> 
        </Button>
           </Col>
           
           <Col s={6}>
        <Button className="btn waves-effect waves-light" style={{marginRight: '5px'}}> XX
        </Button>
           </Col>
       </Row> */}
       <Row>
           <Col> 
           <TextInput icon="chat" placeholder="your message here" /> 
           </Col>
       </Row>
       <Row>
           <Col m={6} s={12}>
           <Collection>
           
           <CollectionItem className="avatar">
                <img src="https://materializecss.com/images/yuna.jpg" alt="" className="circle" />
                <span className="user-name">
                username
                </span>
                <p>
                Message / Note
                <br/>
                date
                </p>
                    <Icon>
                        thumb_up
                    </Icon>
                <Icon>
                    thumb_down
                </Icon>
            </CollectionItem>
           </Collection>
           </Col>
       </Row>
       


    </div>
)

export default BookClubView;


