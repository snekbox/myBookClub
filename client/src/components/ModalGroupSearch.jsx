import React from 'react';
import {
  NavItem,
  Icon,
  Modal,
  Button,
  Card,
  Row,
  Col,
  Autocomplete,
} from 'react-materialize';

const ModalGroupSearch = ({
  groupSearchResults,
  searchClubs,
  handleClubSearch,
  groupSearchQuery,
  joinGroup,
  autocompleteObject,
}) => (
  <Modal
    fixedFooter
    header="Search For Groups"
    trigger={
      <NavItem href="/">
        <Icon>search</Icon>
      </NavItem>
    }
  >
    <Autocomplete
      options={{ data: autocompleteObject }}
      icon="search"
      label="Bookclub Search"
      onChange={e => handleClubSearch(e.target.value)}
    />
    <Button onClick={() => searchClubs(groupSearchQuery)}>Search</Button>
    {groupSearchResults.length ?
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
                waves="light"
                onClick={() => joinGroup(group.id)}
                large
                className="teal right modal-close"
                style={{ marginTop: 'auto' }}
              >
                Join Group
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

export default ModalGroupSearch;
