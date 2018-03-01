import React from 'react'
import { NavLink } from 'react-router-dom'
import data from './assets/icons/data.svg'
import block from './assets/icons/block.svg'
import settings from './assets/icons/settings.svg'
import home from './assets/icons/home.svg'

const Footer = () => (
  <div className="bottom_nav fixed bottom-0">
    <NavLink className="bottom_nav--item" exact to="/">
      <img alt="" className="bottom_nav--image" src={home} />
    </NavLink>
    <NavLink className="bottom_nav--item" to="#">
      <img alt="" src={data} />
    </NavLink>
    <NavLink className="bottom_nav--item" to="/settings">
      <img alt="" src={settings} />
    </NavLink>
    <NavLink className="bottom_nav--item" to="/blockly">
      <img alt="" src={block} />
    </NavLink>
  </div>
)

export default Footer
