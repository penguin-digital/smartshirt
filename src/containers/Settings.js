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
      range1: 0,
      range2: 0,
      range3: 0,
      range4: 0
    }
  }

  render() {
    return (
      <div className="relative container">
        <div className="f2 fw6 pv5">Laufschrift</div>
        <input
          type="text"
          id="customText"
          label="Custom text"
          className="w-80 h2"
          onChange={() =>
            this.setState({ text: document.getElementById('customText').value })
          }
        />
        <div className="pv2"> {this.state.text}</div>

        <div className="apply fw6 mt4 mb4 white f4 tc">Apply</div>

        <div className="f3 pv4">Helligkeit</div>
        <input
          id="range1"
          type="range"
          className="w-90"
          defaultValue="0"
          onChange={() =>
            this.setState({ range1: document.getElementById('range1').value })
          }
        />
        <div className="f4 pv2">Value: {this.state.range1}</div>
        <div className="f3 pv4">Farbe</div>
        <input
          id="range2"
          type="range"
          className="w-90 mt3"
          defaultValue="0"
          onChange={() =>
            this.setState({ range2: document.getElementById('range2').value })
          }
        />
        <div className="f4 pv2">Rot: {this.state.range2}</div>
        <input
          id="range3"
          type="range"
          className="w-90 mt3"
          defaultValue="0"
          onChange={() =>
            this.setState({ range3: document.getElementById('range3').value })
          }
        />
        <div className="f4 pv2">Grun: {this.state.range3}</div>
        <input
          id="range4"
          type="range"
          className="w-90 mt3"
          defaultValue="0"
          onChange={() =>
            this.setState({ range4: document.getElementById('range4').value })
          }
        />
        <div className="f4 pv2">Brau: {this.state.range4}</div>

        <div className="colors">
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
