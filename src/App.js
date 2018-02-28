import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

// views
import Home from './containers/Home'
import Settings from './containers/Settings'
import Blockly from './containers/Blockly'

// icons
import menu from './assets/icons/menu.svg'

import './App.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App overflow-hidden">
          <header className="App-header ph2 pv3 cf">
            <Link to="/">
              <h2 className="App-title fl ma0 black f3">SmartShirt</h2>
            </Link>

            <img src={menu} alt="Menu" className="fr mt2 pointer" />
          </header>
          <div className="ph2 vh-100">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/settings" component={Settings} />
              <Route path="/blockly" component={Blockly} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
