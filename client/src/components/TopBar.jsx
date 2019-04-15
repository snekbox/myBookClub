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
