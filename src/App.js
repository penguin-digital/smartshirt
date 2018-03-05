import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// views
import Home from './containers/Home'
import Settings from './containers/Settings'
import Data from './containers/Data'
import Blockly from './containers/Blockly'
import Header from './Header'
import Footer from './Footer'

// icons

import './App.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App vh-100">
          <Header />
          <div className="ph4 mw8 wrapper">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/data" component={Data} />
              <Route path="/settings" component={Settings} />
              <Route path="/blockly" component={Blockly} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App
