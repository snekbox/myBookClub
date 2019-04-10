import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import TopBar from './components/TopBar.jsx'
import LeftBar from './components/LeftBar.jsx'
import BodyGrid from './components/BodyGrid.jsx'
import Settings from './components/Settings.jsx'
import BookClubView from './components/BookClubView.jsx';

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

  render() {
    const { } = this.state;  // destructure state here
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

ReactDOM.render(<Landing />, document.getElementById("root"));