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
      bookSearchInput: '', //handles book search input when creating group
      bookSearchChoice: null,
      createBookClubName: null,
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
    });
    console.log(googleResponse);
  }



  
  bookSearch (bookSearchQuery) { //sends get request to api for books matching search query when creating a group
  axios.get('/test') 
  .then((bookSearchResults)=>{
    this.setState({
      bookSearchResults: bookSearchResults.data.items.filter(book => book.volumeInfo.title.toUpperCase().includes(bookSearchQuery.toUpperCase())), 
      //sets bookSearchResults, in this.state, to search results
    })
  })
  .catch((err)=>{
    console.log('server responded with error: could not complete bookSearch request');
  })
}

handleBookSearchInput (e) {
  //possible throttling of api calls here, when a few letters have been input 
  //to help users pick books before they finish typing an entire book name
  this.setState({
    bookSearchInput: e.target.value,
  })
}

//responds to user clicking search button
handleBookSearchSubmit() {
  this.bookSearch(this.state.bookSearchInput) 
}


addBookClub () { 
  const { bookSearchChoice, createBookClubName } = this.state;
  const data = { //still need the userID on this.state.user/whatever else info is needed for group creation
    name: createBookClubName,
    currentBook: bookSearchChoice,
  }
  axios.post('/test', {
    data: data,
  })
  .then((response)=>{
    console.log(response, 'group saved to database');
    // this.setState({
    //   bookClubs: bookClubs.concat(response), //when database is updated, state needs to be updated
    // })                                       //to reflect newly added bookClub
  })
  .catch((err)=>{
    console.log('club NOT added to database')
  })
}
 

  //function selects currentBook when creating a new group
  selectBook (book) {
    this.setState({
      bookSearchChoice: book, 
    })
  }

  //function sets createBookClubName to input text when creating a new group
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