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
      bookSearchResults: null, // result that bookSearch yields, for use in choosing a book when creating a bookClub
      bookSearchInput: '', //create function below which handles input on change in text box, changes bookSearchInput
    }

    this.renderMain = this.renderMain.bind(this);
    this.chooseView = this.chooseView.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);

    this.handleBookSearchSubmit = this.handleBookSearchSubmit.bind(this);
    this.handleBookSearchInput = this.handleBookSearchInput.bind(this); 
    this.bookSearch = this.bookSearch.bind(this); //api request to book api, returns X number of books that match search
    //this.addBookClub = this.addBookClub.bind(this); // formats book club input, adds book club to bookClubs array
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
    this.setState({loggedIn: true});
    console.log(googleResponse);
  }



  handleBookSearchInput (e) {
    //possible throttling of api calls here, when a few letters have been input 
    //to help users pick books before they finish typing an entire book name
    this.setState({
      bookSearchInput: e.target.value,
    })
  }
 
  bookSearch (bookSearchQuery) { //grabs book data on bookSearch, {title, image, description}
    //sends get request to server
    axios.get('/test') //param setting issues so I'm gonna get all data for now and filter in client
    .then((bookSearchResults)=>{
      console.log('bookSearchQuery: ', bookSearchQuery, 'bookSearchResults: ', bookSearchResults);


        this.setState({
          bookSearchResults: bookSearchResults.data.items, //sets state to search results
        })
        console.log(this.state.bookSearchResults);
    })
    .catch((err)=>{
      console.log(err, 'error line 85 index.jsx');
      //console.log('Server responded with error');
    })
  }

  handleBookSearchSubmit() {
    //this is where bookSearch will be called
    //console.log(this.state.bookSearchInput, 'bookSearchSubmit');
    this.bookSearch(this.state.bookSearchInput) //this should change the state to the results of 
    //a get request for books matching query
  }


  // addBookClub (bookClubName, currentBookInfo) { //current book info from bookSearch function
  //   const bookClub = {};
  //   bookClub.name = bookClubName;
  //   bookClub.currentBookInfo = currentBookInfo;
    
  //   //adds bookClub to database, sends back: id, name, owner, nextMeeting, currentBook, description, image

  //   // axios.post('', {}) 
  //   // .then(()=>{
  //   // })
  //   // .catch((err)=>{
  //   // })
  //   //  .then(()=>{
  //   //    return axios.get()
  //   //  })
  //   //  .then((database info) =>{
  //   //  })
  //   //  .catch((err) => {
  //   //  })
  // }


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