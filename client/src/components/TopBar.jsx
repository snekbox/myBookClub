import React from 'react';
import { Navbar, NavItem, Icon, Dropdown, Divider, Button, Modal, TextInput, Textarea, Card } from 'react-materialize'

const TopBar = ({ chooseView, handleBookSearchInput, handleBookSearchSubmit, bookSearchResults, selectBook, handleCreateBookClubName, addBookClub }) => (
  <div>
    <Navbar brand={<img src='../images/logo.png' className="logo" onClick={() => chooseView('groups')} />} alignLinks="right" className="light-blue">
      <NavItem onClick={() => chooseView('groups')} >
        <Icon>
          home
        </Icon>
      </NavItem>
      <NavItem href="/">
        <Icon>
          search
        </Icon>
      </NavItem>

      <Modal header="Create a new club" trigger={ 
      <NavItem> 
        <Icon>add_circle_outline</Icon> 
        </NavItem> 
      }>
        <h6> club owner: current user </h6>
          <Modal header="select a book" trigger={ <Button> Select a book! </Button> }>
          <TextInput placeholder="search for books" onChange={ (e) =>{ handleBookSearchInput(e) } }></TextInput>
          <Button className="bookSearch" onClick={ ()=>{ handleBookSearchSubmit() } }>Search</Button>
            {
              bookSearchResults.map((book) =>{
                  return <Card onClick={ ()=>{selectBook(book)} } key={book.id}>
                  <h6>{book.volumeInfo.title}</h6>
                  <Button className="modal-close">Select Book</Button>
                   <img src={ book.volumeInfo.imageLinks.smallThumbnail}></img> 
                   {book.volumeInfo.description} 
                   </Card>
               })
              } 
          </Modal>
        <TextInput placeholder="Club Name" onChange={ (e)=>{handleCreateBookClubName(e)} }/>
        <Textarea placeholder="Additional data about club here" />
        <Button className="modal-close" onClick={ addBookClub }>Create Club</Button>
      </Modal>  

      <NavItem href="/">
        <Icon>
          video_call
        </Icon>
      </NavItem>
      <NavItem onClick={() => chooseView('settings')} >
        <Icon>
          settings
        </Icon>
      </NavItem>
    </Navbar>
  </div>
);


export default TopBar;