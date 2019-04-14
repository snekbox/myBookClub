import React from 'react';
import { Navbar, NavItem, Icon, Modal, TextInput, Button, Card, Row, Col } from 'react-materialize'

const TopBar = ({ chooseView, groupSearchResults, searchClubs, handleClubSearch, groupSearchQuery, joinGroup }) => (
  <div>
    <Navbar brand={<img src='../images/logo.png' className="logo" onClick={() => chooseView('groups')} />} alignLinks="right" className="light-blue">
      <NavItem onClick={() => chooseView('groups')} >
        <Icon>
          home
        </Icon>
      </NavItem>
      <Modal header="Search" trigger={
        <NavItem href="/">
          <Icon>
            search
        </Icon>
        </NavItem>
      }>
        <TextInput icon="search" label="Bookclub Search" onChange={(e) => handleClubSearch(e.target.value)} />
        <Button onClick={() => searchClubs(groupSearchQuery)}>Search</Button>
        {
          groupSearchResults.map(group => (
            <Card key={group.id}>
              <Row>
                <h5>{group.name}</h5>
              </Row>
              <Row>
                <Col s={4}>
                  <img src={group.book.image} />
                </Col>
                <Col s={4}>
                  Current Book: {group.book.title} by {group.book.author}
                </Col>
                <Col s={4}>
                  <Button
                    onClick={() => joinGroup(group.id)}
                    floating
                    large
                    className="teal right"
                    style={{ marginTop: 'auto' }}
                    waves="light"
                    icon="add"
                  />
                </Col>
              </Row>
            </Card>
          ))
        }
      </Modal>
      <NavItem href="/">
        <Icon>
          add_circle_outline
        </Icon>
      </NavItem>
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