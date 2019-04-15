import React from 'react';
import ModalSearchBooks from './ModalSearchBooks.jsx';
import {
  NavItem,
  Icon,
  Modal,
  TextInput,
  Button,
} from 'react-materialize';

const ModalCreateGroup = ({
  handleBookSearchInput,
  handleBookSearchSubmit,
  bookSearchResults,
  selectBook,
  handleCreateBookClubName,
  addBookClub,
  bookSearchChoice,
}) => (
  <Modal
    header="Create a new club"
    fixedFooter
    trigger={
      <NavItem>
        <Icon>add_circle_outline</Icon>
      </NavItem>
    }
  >
    <ModalSearchBooks
      handleBookSearchInput={handleBookSearchInput}
      handleBookSearchSubmit={handleBookSearchSubmit}
      bookSearchResults={bookSearchResults}
      selectBook={selectBook}
      bookSearchChoice={bookSearchChoice}
    />
    <TextInput
      placeholder="Club Name"
      onChange={e => {
        handleCreateBookClubName(e);
      }}
    />
    <Button
      waves="light"
      onClick={addBookClub}
      large
      className="teal right modal-close"
      style={{ marginTop: 'auto' }}
    >
      Create Club
        <Icon right>
        add
        </Icon>
    </Button>
  </Modal>
  );

export default ModalCreateGroup;
