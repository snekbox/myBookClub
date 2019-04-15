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
      groupSearchResults: [],
      groupSearchQuery: '',
      bookSearchResults: [], // result that bookSearch yields, for use in choosing a book when creating a bookClub
      bookSearchInput: '', // handles book search input when creating group
      bookSearchChoice: null,
      createBookClubName: null,
      user: null,
      token: '',
      autocompleteObject: {},
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
  }

  componentDidMount() {
    let username = localStorage.getItem('username');
    let email = localStorage.getItem('email');
    let userId = localStorage.getItem('userId');
    let token = localStorage.getItem('token');
    let googleId = localStorage.getItem('googleId');
    if (token) {
      this.setState({user: {username: username, email: email, id: userId, googleId: googleId}, loggedIn: true, token: token})
      this.getGroups(userId)
      this.getAllGroups();
    }
  }

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

  getAllGroups() {
    axios
      .get('/groups/search', {
        params: {
          query: '',
        },
      })
      .then(result => {
        const results = result.data;
        const autocompleteObject = {}
        results.forEach(group => {
          autocompleteObject[group.name] = group.book.image;
        })
        this.setState({
          autocompleteObject,
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  chooseView(view) {
    this.setState({ view });
  }

  chooseClub(club, book) {
    this.setState({
      currentClub: club,
      currentBook: book,
    });
  }

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

  handleClubSearch(q) {
    this.setState({
      groupSearchQuery: q,
    });
  }

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

  deleteGroup (groupId) {
    const { user } = this.state;
    axios.patch('/groups/delete', {
      groupId,
    })
    .then(() => {
      this.getGroups(user.id);
    })
    .catch(err => {
      console.error(err);
    });
  }

  leaveGroup (groupId) {
    const { user } = this.state;
    axios.patch('/groups/removeUser', {
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

  handleLogIn(response) {
    // console.log(response);
    // const tokenBlob = new Blob(
    //   [JSON.stringify({ access_token: response.accessToken }, null, 2)],
    //   { type: 'application/json' },
    // );
    // console.log(tokenBlob);
    // const options = {
    //   body: response,
    //   mode: 'cors',
    //   cache: 'default',
    // };
    // axios.post('/connect', options).then(r => {
    //   const token = r.headers.get('x-auth-token');
    //   r.json().then(user => {
    //     if (token) {
    //       this.setState({ loggedIn: true, user, token });
    //     }
    //   });
    // });
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
        return result.data
      }).then(result => {
        this.getGroups(this.state.user.id);
      })
      .catch(err => {});
  }

  bookSearch(bookSearchQuery) {
    // sends get request to api for books matching search query when creating a group
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

  handleBookSearchInput(e) {
    // possible throttling of api calls here, when a few letters have been input
    // to help users pick books before they finish typing an entire book name
    this.setState({
      bookSearchInput: e.target.value,
    });
  }

  // responds to user clicking search button
  handleBookSearchSubmit() {
    this.bookSearch(this.state.bookSearchInput);
  }

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
        postObject.bookId = response.data[0].id;
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
            this.getGroups(user.id)                                     //to reflect newly added bookClub
          })
          .catch(err => {
            console.error('club NOT added to database', err);
          });
      });
  }

  // function selects currentBook when creating a new group
  selectBook(book) {
    this.setState({
      bookSearchChoice: book,
    });
  }

  // function sets createBookClubName to input text when creating a new group
  handleCreateBookClubName(e) {
    this.setState({
      createBookClubName: e.target.value,
    });
  }

  renderMain() {
    const {
      view,
      bookClubs,
      sampleData,
      currentBook,
      currentClub,
      user,
    } = this.state;
    if (view === 'groups') {
      return (
        <BodyGrid
          chooseView={this.chooseView}
          chooseClub={this.chooseClub}
          clubs={bookClubs}
          books={sampleData}
        />
      );
    } else if (view === 'settings') {
      return <Settings 
        clubs={bookClubs}
        deleteGroup={this.deleteGroup}
        leaveGroup={this.leaveGroup}
        userId={user.id}
      />;
    } else if (view === 'club view') {
      return <BookClubView club={currentClub} book={currentBook} />;
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
    } = this.state; // destructure state here

    if (!loggedIn) {
      return <LogIn handleLogIn={this.handleLogIn} />;
    } else {
      return (
        <div>
          <LeftBar
            book={bookClubs.length ? bookClubs[0].book : {}}
            club={bookClubs[0]}
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
          />
          {this.renderMain()}
        </div>
      );
    }
    return (
      <div>
        <LeftBar
          book={bookClubs.length ? bookClubs[0].book : {}}
          club={bookClubs[0]}
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
        />
        {this.renderMain()}
      </div>
    );
  }
}

ReactDOM.render(<Landing />, document.getElementById('root'));
