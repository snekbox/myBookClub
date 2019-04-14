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
      groupSearchResults: [{ name: '', book: { image: '', title: '' }, id: 0 }],
      groupSearchQuery: '',
      bookSearchResults: googleBooksApiData.items, // result that bookSearch yields, for use in choosing a book when creating a bookClub
      bookSearchInput: '', // handles book search input when creating group
      bookSearchChoice: null,
      createBookClubName: null,
      user: {
        id: 1,
        username: 'Mark Maher',
        email: 'tenkin@gmail.com',
        createdAt: '2019-04-11T19:26:30.000Z',
        updatedAt: '2019-04-11T19:26:30.000Z',
      },
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
  }

  componentDidMount() {
    // Initial loading logic will go here
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

  handleLogIn() {
    this.getGroups(this.state.user.id);
    this.setState({ loggedIn: true });
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
        console.log(
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
      .catch(err => {
        console.log('error, line 149 index.jsx', err);
      })
      .then(() => {
        axios
          .post('/groups', {
            data: postObject,
          })
          .then(response => {
            console.log(response, 'group saved to database');
            // this.setState({
            //   bookClubs: bookClubs.concat(response), //when database is updated, state needs to be updated
            // })                                       //to reflect newly added bookClub
          })
          .catch(err => {
            console.log('club NOT added to database', err);
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
      return <Settings clubs={bookClubs} />;
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
          />
          {this.renderMain()}
        </div>
      );
    }
  }
}

ReactDOM.render(<Landing />, document.getElementById('root'));
