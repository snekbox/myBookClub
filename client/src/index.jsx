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
    }

    this.renderMain = this.renderMain.bind(this);
    this.chooseView = this.chooseView.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);

    this.bookSearch = this.bookSearch.bind(this); //api request to book api, returns X number of books that match search
    this.addBookClub = this.addBookClub.bind(this); // formats book club input, adds book club to bookClubs array
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

  bookSearch (bookSearchQuery) { //grabs book data on bookSearch, {title, image, description}
    //sends get request to server
    return axios.get('/')
    .then((bookSearchResults)=>{
        //set bookSearchResults as a part of this state
    })
    .catch((err)=>{
      console.log('Server responded with error');
    })
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
    const {loggedIn, bookClubs, sampleData } = this.state;  // destructure state here
    if (!loggedIn) {
      return <LogIn handleLogIn={this.handleLogIn} />
    } else {
      return (
      <div>
        <LeftBar book={sampleData[0]} club={bookClubs[0]}/>
        <TopBar chooseView={this.chooseView} sampleData={sampleData}/>
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