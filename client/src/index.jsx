import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import TopBar from './components/TopBar.jsx'
import LeftBar from './components/LeftBar.jsx'
import BodyGrid from './components/BodyGrid.jsx'
import Settings from './components/Settings.jsx'
<<<<<<< HEAD
import LogIn from './components/LogIn.jsx'
=======
import BookClubView from './components/BookClubView.jsx';
>>>>>>> b151268f0f710898da3607e66820ff0c277f48d6

class Landing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'groups',
      loggedIn: false,
    }

    this.renderMain = this.renderMain.bind(this);
    this.chooseView = this.chooseView.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
  }

  componentDidMount() {
    // Initial loading logic will go here
  }

  renderMain () {
    const { view } = this.state;
    if (view === 'groups') {
      return <BodyGrid chooseView={ this.chooseView }/>
    } else if (view === 'settings') {
      return <Settings />
    } else if (view === 'club view') {
      return <BookClubView />
    }
  }

  chooseView (view) {
    this.setState({view})
  }

  handleLogIn (googleResponse) {
    this.setState({loggedIn: true});
    console.log(googleResponse);
  }

  render() {
    const {loggedIn } = this.state;  // destructure state here
    if (!loggedIn) {
      return <LogIn handleLogIn={this.handleLogIn} />
    } else {
      return (
      <div>
        <LeftBar />
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