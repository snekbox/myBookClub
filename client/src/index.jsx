import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import TopBar from './components/TopBar.jsx'
import LeftBar from './components/LeftBar.jsx'
<<<<<<< HEAD
import BodyGrid from './components/BodyGrid.jsx';
import BookClubView from './components/BookClubView.jsx';
const json = require('../../database/sample-data/sample.js');
import { raw } from 'mysql';
=======
import BodyGrid from './components/BodyGrid.jsx'
import Settings from './components/Settings.jsx'
>>>>>>> d65dcfc02bd09bbd910ab81038e762c993b79c12

class Landing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'groups',
    }

    this.renderMain = this.renderMain.bind(this);
    this.chooseView = this.chooseView.bind(this);
  }

  componentDidMount() {
    // Initial loading logic will go here
  }

  renderMain () {
    const { view } = this.state;
    if (view === 'groups') {
      return <BodyGrid />
    } else if (view === 'settings') {
      return <Settings />
    }
  }

  chooseView (view) {
    this.setState({view})
  }

  render() {
    const { } = this.state;  // destructure state here
    return (
    <div>
      <LeftBar />
<<<<<<< HEAD
      <TopBar />
      {/* <BodyGrid /> */}
      <BookClubView />
=======
      <TopBar chooseView={this.chooseView} />
      {
        this.renderMain()
      }
>>>>>>> d65dcfc02bd09bbd910ab81038e762c993b79c12
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

ReactDOM.render(<Landing />, document.getElementById("root"));