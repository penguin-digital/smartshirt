import React from 'react'
import bla from '../assets/icons/bla.svg'
import fb from '../assets/icons/fb.svg'
import sad from '../assets/icons/sad.svg'
import snap from '../assets/icons/snap.svg'
import wink from '../assets/icons/wink.svg'
import smile from '../assets/icons/smile.svg'

const Settings = () => (
  <div className="relative container">
    <div className="f2 fw6 pv5">Laufschrift</div>
    <input type="text" label="Custom text" className="w-80 h2" />
    <div className="pv2"> Custom text</div>
    <div className="apply fw6 mt4 mb4 white f4 tc">Apply</div>
    <div className="f3 pv4">Helligkeit</div>
    <input id="myRange" type="range" className="w-90" />
    <div className="f3 pv4">Farbe</div>
    <input id="input-1" type="range" className="w-90 mt3" />
    <div className="f4 pv2">Rot: 155</div>
    <input id="input-2" type="range" className="w-90 mt3" />
    <div className="f4 pv2">Grun:0</div>
    <input id="input-3" type="range" className="w-90 mt3" />
    <div className="f4 pv2">Brau:0</div>
    <div className="colors">
      <div className="bg-yellow w-20 h2 mr3 mv4" />
      <div className="bg-blue w-20 h2 mr3 mv4" />
      <div className="bg-purple w-20 h2 mr3 mv4" />
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

export default Settings
