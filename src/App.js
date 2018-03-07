import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Sockette from 'sockette'

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
  constructor(props) {
    super(props)

    this.state = {
      temp: 0,
      lux: 0,
      blue: 0,
      red: 0,
      green: 0,
      color_temp: 0
    }

    this.ws = new Sockette('ws://localhost:80/ws', {
      timeout: 5e3,
      maxAttempts: 10,
      onmessage: evt => {
        const data = JSON.parse(evt.data)

        if (data.name === 'temp')
          this.setState({
            temp: data.value
          })

        if (data.name === 'color')
          this.setState({
            lux: data.value.lux,
            green: data.value.g,
            red: data.value.r,
            blue: data.value.b,
            color_temp: data.value.temp
          })
      }
    })
  }
  render() {
    const { temp, lux, blue, red, green, color_temp } = this.state
    return (
      <Router>
        <div className="App vh-100">
          <Header />
          <div className="ph4 mw8 wrapper relative">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route
                path="/data"
                render={() => (
                  <Data data={{ temp, lux, blue, red, green, color_temp }} />
                )}
              />
              <Route
                path="/settings"
                render={() => <Settings ws={this.ws} />}
              />
              <Route path="/blockly" render={() => <Blockly ws={this.ws} />} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App
