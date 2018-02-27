import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

// views
import Home from './containers/Home'
import Settings from './containers/Settings'
import Blockly from './containers/Blockly'

import './App.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/settings" component={Settings} />
            <Route path="/blockly" component={Blockly} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
