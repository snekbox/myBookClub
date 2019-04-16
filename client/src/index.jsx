import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import TopBar from './components/TopBar.jsx';
import LeftBar from './components/LeftBar.jsx';
import BodyGrid from './components/BodyGrid.jsx';
import Settings from './components/Settings.jsx';
import LogIn from './components/LogIn.jsx';
import BookClubView from './components/BookClubView.jsx';
import {
  bookClubs,
  googleBooksApiData,
} from '../../database/sample-data/sample.js';

class Landing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookClubs,
      view: 'groups',
      loggedIn: false,
      sampleData: googleBooksApiData.items,
      currentClub: bookClubs[0],
      currentBook: googleBooksApiData.items[0],
      currentClubUsers: [],
      groupSearchResults: [],
      groupSearchQuery: '',
      bookSearchResults: [], // result that bookSearch yields, for use in choosing a book when creating a bookClub
      bookSearchInput: '', // handles book search input when creating group
      bookSearchChoice: null,
      createBookClubName: null,
      user: null,
      token: '',
      autocompleteObject: {},
      clubBookComments: [],
      clubBookComment: '',
    };

    this.renderMain = this.renderMain.bind(this);
    this.chooseView = this.chooseView.bind(this);
    this.chooseClub = this.chooseClub.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleBookSearchSubmit = this.handleBookSearchSubmit.bind(this);
    this.handleBookSearchInput = this.handleBookSearchInput.bind(this);
    this.bookSearch = this.bookSearch.bind(this); // api request to book api, returns X number of books that match search
    this.selectBook = this.selectBook.bind(this); // for use selecting books when creating groups
    this.addBookClub = this.addBookClub.bind(this); // formats book club input, adds book club to bookClubs array
    this.handleCreateBookClubName = this.handleCreateBookClubName.bind(this);
    this.getGroups = this.getGroups.bind(this);
    this.searchClubs = this.searchClubs.bind(this);
    this.handleClubSearch = this.handleClubSearch.bind(this);
    this.joinGroup = this.joinGroup.bind(this);
    this.deleteGroup = this.deleteGroup.bind(this);
    this.leaveGroup = this.leaveGroup.bind(this);
    this.handleCommentText = this.handleCommentText.bind(this); //handles changes in comment text
    this.submitComment = this.submitComment.bind(this); //handles clicking button to submit comments
    this.getGroupComments = this.getGroupComments.bind(this); //gets all comments in given group, for use in rendering comments on click of a group card
    this.logout = this.logout.bind(this);
    this.addBookToGroup = this.addBookToGroup.bind(this);
  }

  componentDidMount() {
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const googleId = localStorage.getItem('googleId');
    if (token) {
      this.setState({
        user: {
          username: username,
          email: email,
          id: userId,
          googleId: googleId,
        },
        loggedIn: true,
        token: token,
      });
      this.getGroups(userId);
      this.getAllGroups();
    }
  }

  /** 
   * @function getGroups
  * Changes state to render book clubs that user is a part of.
  * @async
  * @param {string} userId - The Id of a user stored in the database.
  */
  getGroups(userId) {
    axios
      .get('/groups', {
        params: {
          userId,
        },
      })
      .then(response => {
        this.setState({
          bookClubs: response.data,
        });
      })
      .catch(err => {
        console.error(err);
      });
  }
 /** 
  * @function getAllGroups
  * Changes state to render all book clubs in database.
  * @async
  */
  getAllGroups() {
    axios
      .get('/groups/search', {
        params: {
          query: '',
        },
      })
      .then(result => {
        const results = result.data;
        const autocompleteObject = {};
        results.forEach(group => {
          autocompleteObject[group.name] = group.book.image;
        });
        this.setState({
          autocompleteObject,
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

   /** 
    * @function logout
  * Rids the local storage of all info, including user's session. This redirects user to login page.
  */
  logout() {
    localStorage.clear();
    this.setState({ loggedIn: false });
    axios.get('/logout')
  }

   /** 
    * @function chooseView
  * Changes state to render chosen component.
  * @param {any} view - The JSX component that is to be rendered on the page. State is set to this component.
  */
  chooseView(view) {
    this.setState({ view });
  }

   /** 
  * @function chooseClub club information when user chooses club, to render chosen club.
  * @async
  * 
  * @param {object} club - The club current club to retrieve club information from, including users, for the purpose of rendering club interface.
  * @param {object} book - The current book a club is reading, and discussing. For use in rendering club interface.
  * Sends axios call to server, then in turn, to database to retrieve club information.
  */
  chooseClub(club, book) {
    axios
      .get('/users', {
        params: {
          groupId: club.id,
        },
      })
      .then((result) => {
        const userList = result.data;
        this.setState({
          currentClub: club,
          currentBook: book,
          currentClubUsers: userList,
        });
      }).catch((err) => {
        console.error(err);
      });
  }
/**
 * @function searchClubs
 * @async
 * Sends get request to database, for club lookup
 * @param {*} query name of club to search for
 */
  searchClubs(query) {
    axios
      .get('/groups/search', {
        params: {
          query,
        },
      })
      .then(result => {
        const searchResults = result.data;
        this.setState({
          groupSearchResults: searchResults,
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  /**
   * @function handleClubSearch
   * changes stately variable groupSearchQuery to reflect club search
   * 
   * @param {string} q event handler that responds to changes in a text box
   */
  handleClubSearch(q) {
    this.setState({
      groupSearchQuery: q,
    });
  }

  /**
   * @function joinGroup
   * @async
   * @param {*} groupId takes a number representing a group's Id, sends
   */
  joinGroup(groupId) {
    const { user } = this.state;
    axios
      .patch('/groups', {
        groupId,
        userId: user.id,
      })
      .then(() => {
        this.getGroups(user.id);
      })
      .catch(err => {
        console.error(err);
      });
  }
/**
 * @function deleteGroup
 * takes in a group Id, drops info from database pertaining to group with this ID
 * @async
 * @param {*} groupId group's ID to delete
 * user cannot delete groups that they do not own/did not create
 */
  deleteGroup(groupId) {
    const { user } = this.state;
    axios
      .patch('/groups/delete', {
        groupId,
      })
      .then(() => {
        this.getGroups(user.id);
      })
      .catch(err => {
        console.error(err);
      });
  }
/**
 * @function leaveGroup
 * takes in a group's ID, current user who is logged in has ID destructured from state,
 * and their references to group (groupId) argument are deleted from database.
 * @param {groupId} groupId 
 */
  leaveGroup(groupId) {
    const { user } = this.state;
    axios
      .patch('/groups/removeUser', {
        groupId,
        userId: user.Id,
      })
      .then(() => {
        this.getGroups(user.id);
      })
      .catch(err => {
        console.error(err);
      });
  }

  /**
   * @function handleLogIn
   * allows users to view landing page, stores some of their data including accesstoken and some user info
   * @async
   * @param {*} response info from google that allows users info to be stored in database, allows sessions to be created
   */
  handleLogIn(response) {
    axios
      .post('/connect', {
        access_token: response.accessToken,
        profile: response.profileObj,
      })
      .then(result => {
        let username = localStorage.setItem('username', result.data.username);
        let email = localStorage.setItem('email', result.data.email);
        let userId = localStorage.setItem('userId', result.data.id);
        let token = localStorage.setItem('token', result.data.token);
        let googleId = localStorage.setItem('googleId', result.data.googleId);
        this.setState({ loggedIn: true, user: result.data });
        return result.data;
      })
      .then(result => {
        this.getGroups(this.state.user.id);
      })
      .catch(err => {});
  }
  /**
   * @function bookSearch
   * sends get request to api for books matching search query when creating a group
   * @async
   * @param {bookSearchQuery} bookSearchQuery string that is sent as query to api, returns results as stately variables 
   * for use in book club creation/adding books to club
   *  */ 

  bookSearch(bookSearchQuery) {
    return axios
      .get('/books/googleapi', {
        params: {
          query: bookSearchQuery,
        },
      })
      .then(bookSearchResults => {
        this.setState({
          bookSearchResults: bookSearchResults.data,
        });
      })
      .catch(err => {
        console.error(
          err,
          'server responded with error: could not complete bookSearch request',
        );
      });
  }
  /**
   * @function handleBookSearchInput
   * handles input in book search text area, allows for user to add what they type to the state,
   * and search by sending this text as query to api when handleBookSearchSubmit is clicked. This info is what's sent.
   * @param {*} e //event with text as target
   */
  handleBookSearchInput(e) {
    this.setState({
      bookSearchInput: e.target.value,
    });
  }

  /**
   * @function handleBookSearchSubmit
   * responds to user clicking search button
   * calls bookSearch on button click, on bookSearchInput
   */ 
  handleBookSearchSubmit() {
    this.bookSearch(this.state.bookSearchInput);
  }
/**
 * @function addBookClub
 * allows user to select book, input a book club name, and create a club. 
 * This club is then rendered, once it's been added to the database.
 * User who created club is owner, and has ability to delete club.
 */
  addBookClub() {
    const { bookSearchChoice, createBookClubName, user } = this.state;
    // console.log(bookSearchChoice)
    let author = bookSearchChoice.volumeInfo.authors;
    if (Array.isArray(bookSearchChoice.volumeInfo.authors)) {
      author = bookSearchChoice.volumeInfo.authors.join(', ');
    }
    const bookQuery = {
      author,
      title: bookSearchChoice.volumeInfo.title,
      published: bookSearchChoice.volumeInfo.publishedDate.slice(0, 4),
      image: bookSearchChoice.volumeInfo.imageLinks.thumbnail,
      urlInfo: bookSearchChoice.volumeInfo.infoLink,
      description: bookSearchChoice.volumeInfo.description,
      isbn: bookSearchChoice.volumeInfo.industryIdentifiers.filter(
        id => id.type === 'ISBN_13',
      )[0].identifier,
    };
    // posts to books, to return book id
    const postObject = {
      userId: user.id,
      groupName: createBookClubName,
      bookId: null,
    };
    axios
      .post('/books/googleapi', {
        query: bookQuery,
      })
      .then(response => {
        postObject.bookId = response.data.id;
      })
      // .catch(err => {
      //   console.log('error, line 149 index.jsx', err);
      // })
      .then(() => {
        axios
          .post('/groups', {
            data: postObject,
          })
          .then(response => {
            this.getGroups(user.id); //to reflect newly added bookClub
          })
          .catch(err => {
            console.error('club NOT added to database', err);
          });
      });
  }

  /**
   * @function selectBook
   * selects currentBook when creating a new group
   *@param {book} book object containing info about a book, selecting book sets specific book 
   * to bookSearchChoice for use in group creation- when a book club is created, it needs a book to discuss. 
   * 
   */ 
  selectBook(book) {
    this.setState({
      bookSearchChoice: book,
    });
  }
/**
 * @function handleCreateBookClubName
 *  sets createBookClubName stately variable to input text when creating a new group
 * @param {*} e text input, handled on change
 */
  // 
  handleCreateBookClubName(e) {
    this.setState({
      createBookClubName: e.target.value,
    });
  }

  /**
   * @function addBookToGroup
   * adds a book to a group with the given group ID
   * @async updates state when finished
   * @param {*} groupId group to add book info to
   * @param {*} book book info to add to group
   */
  addBookToGroup (groupId, book) {
    const bookQuery = {
      author: book.volumeInfo.authors.join(', '),
      title: book.volumeInfo.title,
      published: book.volumeInfo.publishedDate.slice(0, 4),
      image: book.volumeInfo.imageLinks.thumbnail,
      urlInfo: book.volumeInfo.infoLink,
      description: book.volumeInfo.description,
      isbn: book.volumeInfo.industryIdentifiers.filter(
        id => id.type === 'ISBN_13',
      )[0].identifier,
    };
    axios
      .post('/books/googleapi', {
        query: bookQuery,
      })
      .then(response => {
        const bookObj = response.data;
        return axios
          .patch('/groups/book', {
            groupId,
            bookId: bookObj.id,
        })
      })
      .then(results => {
        const updatedGroup = results.data;
        this.setState({
          currentClub: updatedGroup,
          currentBook: updatedGroup.book,
        })
      })
      .catch(err => {
        console.error(err);
      });
  }

  /**
   * @function handleCommentText
   * handles individual comment's text input, on change, by altering state
   * @param {any string} text 
   */

  handleCommentText (text) { 
    this.setState({
      clubBookComment: text.target.value,
    })
  }

/**
 * @function submitComment
 * function for adding comments to database, deconstructs state to produce
 * input comment, user's ID, group's ID, current book's ID
 * @async
 * sets state when server responds to reflect all comments on current group
 */

  submitComment () {
    const {clubBookComment, user, currentBook, currentClub} = this.state;
    const comment = {
        commentText: clubBookComment,
        userId: user.id, 
        groupId: currentClub.id,
        bookId: currentBook.id,
    }
    axios
    .post('/groups/comments', {
      query: {
        comment,
      }
    })
    .then((currentClubComments)=>{
      this.setState({
        clubBookComments: currentClubComments.data, 
      });
    })
    .catch((err)=>{
      console.error('did not add comment')
    })
  }


/**
 * @function getGroupComments
 * sends get request to server, to query the database for all comments associated with a club and book.
 * @param {*} group for purpose of using the group's id to query db
 * @param {*} book for purpose of using the book's id to query db
 * 
 * sets clubBookComments to all comments for this given group/book
 */

  getGroupComments (group, book) {
    axios.get('/groups/comments', {
      params: {
        groupId: group.id,
        bookId: book.id,
      }
    })
    .then((groupComments)=>{
      this.setState({
        clubBookComments: groupComments.data,
      })
    })
    .catch((err)=>{
      console.error('unable to retrieve books from this group, server responded with error')
    })
  } 


  renderMain() {
    const {
      view,
      bookClubs,
      sampleData,
      currentBook,
      currentClub,
      clubBookComments, 
      clubBookComment,  
      currentClubUsers,
      user,
      bookSearchChoice,
      bookSearchResults,
    } = this.state;
    if (view === 'groups') {
      return (
        <BodyGrid
          chooseView={this.chooseView}
          chooseClub={this.chooseClub}
          getGroupComments={this.getGroupComments}
          clubs={bookClubs}
          books={sampleData}
          userId={user.id}
        />
      );
    } else if (view === 'settings') {
      return <Settings 
        clubs={bookClubs}
        deleteGroup={this.deleteGroup}
        leaveGroup={this.leaveGroup}
        user={user}
      />;
    } else if (view === 'club view') {
      return <BookClubView 
        club={currentClub}
        book={currentBook}
        userList={currentClubUsers}
        user={user}
        addBookToGroup={this.addBookToGroup}
        handleBookSearchInput={this.handleBookSearchInput}
        handleBookSearchSubmit={this.handleBookSearchSubmit}
        bookSearchResults={bookSearchResults}
        selectBook={this.selectBook}
        bookSearchChoice={bookSearchChoice}
        clubBookComments={clubBookComments} 
        clubBookComment={clubBookComment} 
        handleCommentText={this.handleCommentText} 
        submitComment={this.submitComment}
      />;
    }
  }

  render() {
    const {
      loggedIn,
      bookClubs,
      groupSearchResults,
      groupSearchQuery,
      bookSearchInput,
      bookSearchResults,
      autocompleteObject,
      bookSearchChoice,
    } = this.state; 

    if (!loggedIn) {
      return <LogIn handleLogIn={this.handleLogIn} />;
    } 
      return (
        <div>
          <LeftBar
            book={bookClubs.length ? bookClubs[0].book : {}}
            club={bookClubs[0]}
            chooseView={this.chooseView}
            chooseClub={this.chooseClub}
          />
          <TopBar
            chooseView={this.chooseView}
            groupSearchResults={groupSearchResults}
            groupSearchQuery={groupSearchQuery}
            handleClubSearch={this.handleClubSearch}
            searchClubs={this.searchClubs}
            joinGroup={this.joinGroup}
            handleBookSearchInput={this.handleBookSearchInput}
            handleBookSearchSubmit={this.handleBookSearchSubmit}
            selectBook={this.selectBook}
            handleCreateBookClubName={this.handleCreateBookClubName}
            addBookClub={this.addBookClub}
            bookSearchResults={bookSearchResults}
            bookSearchInput={bookSearchInput}
            autocompleteObject={autocompleteObject}
            bookSearchChoice={bookSearchChoice}
            logout={this.logout}
          />
          {this.renderMain()}
        </div>
      );
  }
}

ReactDOM.render(<Landing />, document.getElementById('root'));
