import React from 'react';
import { BrowserRouter as Link, NavLink } from 'react-router-dom';
import data from './assets/icons/data.svg';
import block from './assets/icons/block.svg';
import settings from './assets/icons/settings.svg';
import home from './assets/icons/home.svg';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="bottom_nav">
        <NavLink className="bottom_nav--item" exact to="/">
          <img className="bottom_nav--image" src={home} />
        </NavLink>
        <NavLink className="bottom_nav--item" to="#">
          <img src={data} />
        </NavLink>
        <NavLink className="bottom_nav--item" to="/settings">
          <img src={settings} />
        </NavLink>
        <NavLink className="bottom_nav--item" to="/blockly">
          <img src={block} />
        </NavLink>
      </div>
    );
  }
}
