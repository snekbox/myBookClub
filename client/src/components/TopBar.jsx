import React from 'react';
import ModalGroupSearch from './ModalGroupSearch.jsx';
import ModalCreateGroup from './ModalCreateGroup.jsx';
import {
  Navbar,
  NavItem,
  Icon,
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
  autocompleteObject,
  bookSearchChoice,
  logout,
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
      className="blue-grey"
    >
      <NavItem onClick={() => chooseView('groups')}>
        <Icon>home</Icon>
      </NavItem>
      <ModalGroupSearch
        groupSearchResults={groupSearchResults}
        searchClubs={searchClubs}
        handleClubSearch={handleClubSearch}
        groupSearchQuery={groupSearchQuery}
        joinGroup={joinGroup}
        autocompleteObject={autocompleteObject}
      />
      <ModalCreateGroup 
        handleBookSearchInput={handleBookSearchInput}
        handleBookSearchSubmit={handleBookSearchSubmit}
        bookSearchResults={bookSearchResults}
        selectBook={selectBook}
        handleCreateBookClubName={handleCreateBookClubName}
        addBookClub={addBookClub}
        bookSearchChoice={bookSearchChoice}
      />
      <NavItem onClick={() => chooseView('settings')}>
        <Icon>settings</Icon>
      </NavItem>
      <NavItem onClick={() => logout()}>
        <Icon>exit_to_app</Icon>
      </NavItem>
    </Navbar>
  </div>
);

export default TopBar;
