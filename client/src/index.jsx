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
      user: { 
        "id": 3,
        "username": "108332420382419596387",
        "email": "tenkin@gmail.com",
        "createdAt": "2019-04-11T19:26:30.000Z",
        "updatedAt": "2019-04-11T19:26:30.000Z" },
    }

    this.renderMain = this.renderMain.bind(this);
    this.chooseView = this.chooseView.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.getGroups = this.getGroups.bind(this);
  }

  componentDidMount() {
  }

  getGroups (userId) {
    axios.get('/groups', { userId })
    .then((bookClubs) => {
      this.setState({
        bookClubs
      })
    }).catch((err) => {
      console.error(err);
    });
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

  handleLogIn () {
    axios({
      url: '/auth/google',
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true",
      }
    })
    .then((userObj) => {
      console.log(userObj)
      this.setState({
        // user: userObj,
        loggedIn: true,
      })
    }).then(()=>{
      this.getGroups(this.state.user.id);
    }).catch((err) => {
      console.error(err)
    });
  }

  render() {
    const {loggedIn, bookClubs, sampleData } = this.state;  // destructure state here
    if (!loggedIn) {
      return <LogIn handleLogIn={this.handleLogIn} />
    } else {
      return (
      <div>
        <LeftBar book={sampleData[0]} club={bookClubs[0]}/>
        <TopBar chooseView={this.chooseView} />
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