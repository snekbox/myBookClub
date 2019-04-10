import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import TopBar from './components/TopBar.jsx'
import LeftBar from './components/LeftBar.jsx'
import BodyGrid from './components/BodyGrid.jsx';
import BookClubView from './components/BookClubView.jsx';
const json = require('../../database/sample-data/sample.js');
import { raw } from 'mysql';

class Landing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  componentDidMount() {
    // Initial loading logic will go here
  }

  render() {
    const {} = this.state;  // destructure state here
    return (
    <div>
      <LeftBar />
      <TopBar />
      {/* <BodyGrid /> */}
      <BookClubView />
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