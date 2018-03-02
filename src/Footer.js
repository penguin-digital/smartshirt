import React from 'react'
import { NavLink } from 'react-router-dom'
import data from './assets/icons/data.svg'
import block from './assets/icons/block.svg'
import settings from './assets/icons/settings.svg'
import dataPurple from './assets/icons/data-p.svg'
import blockPurple from './assets/icons/blockly-p.svg'
import settingsPurple from './assets/icons/setting-p.svg'
import homePurple from './assets/icons/home-p.svg'
import home from './assets/icons/home.svg'

const Footer = () => (
  <div className="bottom_nav fixed bottom-0">
    <NavLink className="bottom_nav--item" exact to="/">
      <img className="icon--not-active" alt="" src={home} />
      <img className="icon--active" alt="" src={homePurple} />
    </NavLink>
    <NavLink className="bottom_nav--item" to="/data">
      <img className="icon--not-active" alt="" src={data} />
      <img className="icon--active" alt="" src={dataPurple} />
    </NavLink>
    <NavLink className="bottom_nav--item" to="/settings">
      <img className="icon--not-active" alt="" src={settings} />
      <img className="icon--active" alt="" src={settingsPurple} />
    </NavLink>
    <NavLink className="bottom_nav--item" to="/blockly">
      <img className="icon--not-active" alt="" src={block} />
      <img className="icon--active" alt="" src={blockPurple} />
    </NavLink>
  </div>
)

export default Footer
