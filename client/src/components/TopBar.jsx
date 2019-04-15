import React from 'react';
import {
  Navbar,
  NavItem,
  Icon,
  Modal,
  TextInput,
  Button,
  Card,
  Row,
  Col,
  Textarea,
} from 'react-materialize';

const TopBar = ({
  chooseView,
  handleBookSearchInput,
  handleBookSearchSubmit,
  bookSearchResults,
  selectBook,
  handleCreateBookClubName,
  addBookClub,
  groupSearchResults,
  searchClubs,
  handleClubSearch,
  groupSearchQuery,
  joinGroup,
}) => (
  <div>
    <Navbar
      brand={
        <img
          src="../images/logo.png"
          className="logo"
          onClick={() => chooseView('groups')}
        />
      }
      alignLinks="right"
      className="light-blue"
    >
      <NavItem onClick={() => chooseView('groups')}>
        <Icon>home</Icon>
      </NavItem>
      <Modal
        header="Search"
        trigger={
          <NavItem href="/">
            <Icon>search</Icon>
          </NavItem>
        }
      >
        <TextInput
          icon="search"
          label="Bookclub Search"
          onChange={e => handleClubSearch(e.target.value)}
        />
        <Button onClick={() => searchClubs(groupSearchQuery)}>Search</Button>
        {groupSearchResults.map(group => (
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
                  className="teal right modal-close"
                  style={{ marginTop: 'auto' }}
                  waves="light"
                  icon="add"
                />
              </Col>
            </Row>
          </Card>
        ))}
      </Modal>
      <Modal
        header="Create a new club"
        trigger={
          <NavItem>
            <Icon>add_circle_outline</Icon>
          </NavItem>
        }
      >
        <Modal
          header="select a book"
          trigger={<Button> Select a book! </Button>}
        >
          <TextInput
            placeholder="search for books"
            onChange={e => {
              handleBookSearchInput(e);
            }}
          />
          <Button
            className="bookSearch"
            onClick={() => {
              handleBookSearchSubmit();
            }}
          >
            Search
          </Button>
          {bookSearchResults.map(book => {
            return (
              <Card
                onClick={() => {
                  selectBook(book);
                }}
                key={book.id}
              >
                <h6>{book.volumeInfo.title}</h6>
                <Button className="modal-close">Select Book</Button>
                <img src={book.volumeInfo.imageLinks.smallThumbnail} />
                {book.volumeInfo.description}
              </Card>
            );
          })}
        </Modal>
        <TextInput
          placeholder="Club Name"
          onChange={e => {
            handleCreateBookClubName(e);
          }}
        />
        <Button className="modal-close" onClick={addBookClub}>
          Create Club
        </Button>
      </Modal>
      <NavItem href="/">
        <Icon>video_call</Icon>
      </NavItem>
      <NavItem onClick={() => chooseView('settings')}>
        <Icon>settings</Icon>
      </NavItem>
    </Navbar>
  </div>
);

export default TopBar;
