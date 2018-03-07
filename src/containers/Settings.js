import React from 'react'

import bla from '../assets/icons/bla.svg'
import fb from '../assets/icons/fb.svg'
import sad from '../assets/icons/sad.svg'
import snap from '../assets/icons/snap.svg'
import wink from '../assets/icons/wink.svg'
import smile from '../assets/icons/smile.svg'

export default class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: 'Custom text',
      brightness: 0,
      red: 0,
      green: 0,
      blue: 0
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state !== nextState) {
      var msg = {
        name: 'text',
        value: {
          text: nextState.text,
          brightness: nextState.brightness,
          red: nextState.red,
          green: nextState.green,
          blue: nextState.blue
        }
      }

      this.props.ws.send(JSON.stringify(msg))
    }
  }

  render() {
    return (
      <div className="relative container w-90 center">
        <div className="f2 fw6 pv5">Laufschrift</div>
        <input
          type="text"
          id="customText"
          label="Custom text"
          className="w-80 h2"
          value={this.state.text}
          onChange={e => this.setState({ text: e.target.value })}
        />

        <div className="apply btn fw6 mt4 mb4 white f4 tc">Apply</div>

        <div className="f3 pv4">Helligkeit</div>
        <input
          id="brightness"
          type="range"
          className="w-90"
          defaultValue="0"
          onChange={e =>
            this.setState({ brightness: parseInt(e.target.value, 10) })
          }
        />
        <div className="f4 pv2">Value: {this.state.brightness}</div>
        <div className="f3 pv4">Farbe</div>
        <input
          id="red"
          type="range"
          className="w-90 mt3"
          defaultValue="0"
          onChange={e => this.setState({ red: parseInt(e.target.value, 10) })}
        />
        <div className="f4 pv2">Rot: {this.state.red}</div>
        <input
          id="green"
          type="range"
          className="w-90 mt3"
          defaultValue="0"
          onChange={e => this.setState({ green: parseInt(e.target.value, 10) })}
        />
        <div className="f4 pv2">Grun: {this.state.green}</div>
        <input
          id="blue"
          type="range"
          className="w-90 mt3"
          defaultValue="0"
          onChange={e => this.setState({ blue: parseInt(e.target.value, 10) })}
        />
        <div className="f4 pv2">Brau: {this.state.blue}</div>

        <div className="flex">
          <div className="bg-yellow w-10 h2 mr3 mv4" />
          <div className="bg-blue w-10 h2 mr3 mv4" />
          <div className="bg-purple w-10 h2 mr3 mv4" />
        </div>

        <div className="f2 pv4 fw6"> Emoticons </div>
        <img className="w3 pr2 mb3" src={smile} alt="" />
        <img className="w3 pr2 mb3" src={wink} alt="" />
        <img className="w3 pr2 mb3" src={bla} alt="" />
        <img className="w3 pr2 mb3" src={sad} alt="" />

        <div className="f2 pv4 fw6"> Social Media </div>
        <img className="w3 pr3 mb6" src={snap} alt="" />
        <img className="w3 mb6" src={fb} alt="" />
      </div>
    )
  }
}
