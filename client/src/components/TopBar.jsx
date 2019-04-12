import React from 'react';
import { Navbar, NavItem, Icon, Dropdown, Divider, Button, Modal, TextInput, Textarea, Card } from 'react-materialize'

const TopBar = ({ chooseView, sampleData }) => (
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
          <TextInput placeholder="search for books"></TextInput>
            {
              sampleData.map((book) =>{
                  return <Card horizontal header={ book.volumeInfo.title }>
                   <img src={ book.volumeInfo.imageLinks.smallThumbnail}></img> 
                   {book.volumeInfo.description}
                   </Card>
                })
              }
          </Modal>
        <TextInput placeholder="Club Name" />
        <Textarea placeholder="Additional data about club here" />
        <Button>Create Club</Button>
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