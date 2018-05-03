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

    // all the options and readings
    this.state = {
      temp: 0,
      lux: 0,
      blue: 0,
      red: 0,
      green: 0,
      color_temp: 0,
      ws_msg: ''
    }

    // define default websocket url
    let ws_url = 'ws://localhost:80/ws'

    // check for window to prevent build error
    if (typeof window !== 'undefined') {
      // set proper websocket address based on used protocol
      if (window.location.protocol === 'http:') {
        ws_url = 'ws://' + window.location.host + '/ws'
      } else if (window.location.protocol === 'https:') {
        ws_url = 'wss://' + window.location.host + '/ws'
      }
    }

    // create a new websocket connection with the server
    this.ws = new Sockette(ws_url, {
      timeout: 5e3,
      maxAttempts: 10,
      onmessage: evt => {
        // when the socket passes a message parse the data
        const data = JSON.parse(evt.data)

        // if the name of the event is temp set the temperature reading
        if (data.name === 'temp')
          this.setState({
            temp: data.value
          })

        // if the event name is color set the color related data
        if (data.name === 'color')
          this.setState({
            lux: data.value.lux,
            green: data.value.g,
            red: data.value.r,
            blue: data.value.b,
            color_temp: data.value.temp
          })
      },
      // use the other events to show a msg in the header
      onopen: e =>
        this.setState({
          ws_msg: 'Connected'
        }),
      onreconnect: e =>
        this.setState({
          ws_msg: 'Reconnecting...'
        }),
      onclose: e =>
        this.setState({
          ws_msg: 'Disconnected'
        }),
      onerror: e =>
        this.setState({
          ws_msg: 'Websocket Error'
        })
    })
  }
  render() {
    const { temp, lux, blue, red, green, color_temp, ws_msg } = this.state

    return (
      <Router>
        <div className="App vh-100">
          <Header msg={ws_msg} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              path="/data"
              render={() => (
                <Data data={{ temp, lux, blue, red, green, color_temp }} />
              )}
            />
            <Route path="/settings" render={() => <Settings ws={this.ws} />} />
            <Route path="/blockly" render={() => <Blockly ws={this.ws} />} />
          </Switch>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App
