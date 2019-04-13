import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import TopBar from './components/TopBar.jsx'
import LeftBar from './components/LeftBar.jsx'
import BodyGrid from './components/BodyGrid.jsx'
import Settings from './components/Settings.jsx'
import LogIn from './components/LogIn.jsx'
import BookClubView from './components/BookClubView.jsx';
import { bookClubs, googleBooksApiData } from '../../database/sample-data/sample.js';

class Landing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'groups',
      loggedIn: false,
      bookClubs: bookClubs,
      sampleData: googleBooksApiData.items,
      currentClub: bookClubs[0],
      currentBook: googleBooksApiData.items[0],
      bookSearchResults: googleBooksApiData.items, // result that bookSearch yields, for use in choosing a book when creating a bookClub
      bookSearchInput: '', //create function below which handles input on change in text box, changes bookSearchInput
      bookSearchChoice: null,
      createBookClubName: null,
      createBookClubOwner: null,
      currentUser: null,
    }

    this.renderMain = this.renderMain.bind(this);
    this.chooseView = this.chooseView.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);

    this.handleBookSearchSubmit = this.handleBookSearchSubmit.bind(this);
    this.handleBookSearchInput = this.handleBookSearchInput.bind(this); 
    this.bookSearch = this.bookSearch.bind(this); //api request to book api, returns X number of books that match search
    this.selectBook = this.selectBook.bind(this); //for use selecting books when creating groups
    this.addBookClub = this.addBookClub.bind(this); // formats book club input, adds book club to bookClubs array
    this.handleCreateBookClubName = this.handleCreateBookClubName.bind(this);
  }

  componentDidMount() {
    // Initial loading logic will go here
  }

  renderMain () {
    const { view, bookClubs, sampleData, currentBook, currentClub } = this.state;
    if (view === 'groups') {
      return <BodyGrid chooseView={ this.chooseView} clubs={bookClubs} books={sampleData} />
    } else if (view === 'settings') {
      return <Settings clubs={bookClubs} />
    } else if (view === 'club view') {
      return <BookClubView club={currentClub} book={currentBook} />
    }
  }

  chooseView (view) {
    this.setState({view})
  }

  handleLogIn (googleResponse) {
    this.setState({
      loggedIn: true,
      currentUser: googleResponse.profileObj, //possibly name for use in creating club owners
    });
    console.log(googleResponse);
  }



  
  bookSearch (bookSearchQuery) { //grabs book data on bookSearch, {title, image, description}
  //sends get request to server
  axios.get('/test') //param setting issues so I'm gonna get all data for now and filter in client
  .then((bookSearchResults)=>{
    this.setState({
      bookSearchResults: bookSearchResults.data.items.filter(book => book.volumeInfo.title.toUpperCase().includes(bookSearchQuery.toUpperCase())), 
      //sets state to search results, needs to be changed to search in second axios argument
      //when I figure that out
    })
  })
  .catch((err)=>{
    console.log("error line 82 index.jsx: server sent back bad data from google API");
    //console.log('Server responded with error');
  })
}

//responds to user typing input in 'select a book' box in + modal
handleBookSearchInput (e) {
  //possible throttling of api calls here, when a few letters have been input 
  //to help users pick books before they finish typing an entire book name
  this.setState({
    bookSearchInput: e.target.value,
  })
}

//responds to user clicking search button
handleBookSearchSubmit() {
  this.bookSearch(this.state.bookSearchInput) //this should change the state to the results of 
  //a get request to google api for books matching query
}


addBookClub () { //current book info from bookSearch function
  this.setState({
    createBookClubOwner: this.state.currentUser,
  })
  const { bookSearchChoice, createBookClubName, currentUser } = this.state;
  const data = { 
    userId: currentUser,
    name: createBookClubName,
    currentBook: bookSearchChoice,
  }
  axios.post('/test', {
    data: data,
  })
  .then((response)=>{
    console.log(response, 'group saved to database');
    this.setState({
      bookClubs: bookClubs.concat(response), // state reflects addition to book clubs
    })
    //let client know request went through by setting this.state.bookClubs equal to all the clubs
  })
  .catch((err)=>{
    console.log('data not added to database! line 127, index.jsx')
  })
}
 

  //function to add current book to modal for club creation on card click
  selectBook (book) {
    this.setState({
      bookSearchChoice: book, //needs to be the book object selected when creating group
    })
  }

  handleCreateBookClubName (e){
    this.setState({
      createBookClubName: e.target.value,
    })
    console.log(this.state.createBookClubName);
  }

  render() {
    const {loggedIn, bookClubs, bookSearchResults, sampleData, bookSearchInput } = this.state;  // destructure state here
    if (!loggedIn) {
      return <LogIn handleLogIn={this.handleLogIn} />
    } else {
      return (
      <div>
        <LeftBar book={sampleData[0]} club={bookClubs[0]}/>
        <TopBar chooseView={this.chooseView} 
        handleBookSearchInput={ this.handleBookSearchInput } 
        handleBookSearchSubmit={ this.handleBookSearchSubmit }
        selectBook={ this.selectBook}
        handleCreateBookClubName={ this.handleCreateBookClubName }
        addBookClub={this.addBookClub}
        bookSearchResults={ bookSearchResults }
        bookSearchInput={ bookSearchInput }
        />
        {
          this.renderMain()
        }
      </div>
      )
      // Nav bar
        // logo
        // butttons
      // Side bar
        // Next meeting component
      // Groups view
        // Individual groups
        // add new group button
    }
  }
}

ReactDOM.render(<Landing />, document.getElementById("root"));