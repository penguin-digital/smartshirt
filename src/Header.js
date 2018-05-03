import React from 'react'
import { BrowserRouter as Link, NavLink } from 'react-router-dom'
import menu from './assets/icons/menu.svg'
import close from './assets/icons/close.svg'
import line from './assets/icons/line.svg'

export default class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isMobileMenuOpen: false
    }

    this.toggleMobileMenu = this.toggleMobileMenu.bind(this)
  }

  // toggle between mobile menu states
  toggleMobileMenu() {
    this.setState({ isMobileMenuOpen: !this.state.isMobileMenuOpen })
  }

  render() {
    return (
      <div>
        {this.state.isMobileMenuOpen ? (
          <div className="overlay" onClick={this.toggleMobileMenu}>
            <header>
              <div className="App-header ph2 pv3 cf">
                <Link to="/">
                  <h2 className="App-title fl ma0 black f3">SmartShirt</h2>
                </Link>
                <img
                  onClick={this.toggleMobileMenu}
                  src={close}
                  alt="Menu"
                  className="fr mt2 pointer"
                />

                <div className="nav">
                  <NavLink
                    onClick={this.toggleMobileMenu}
                    className="nav__item"
                    exact
                    to="/"
                  >
                    <img className="nav__line" src={line} alt="" /> Startseite
                  </NavLink>
                  <NavLink
                    onClick={this.toggleMobileMenu}
                    className="nav__item"
                    to="/settings"
                  >
                    <img className="nav__line" src={line} alt="" />
                    Einstellungen
                  </NavLink>
                  <NavLink
                    onClick={this.toggleMobileMenu}
                    className="nav__item"
                    to="/blockly"
                  >
                    <img className="nav__line" src={line} alt="" /> Blockly
                  </NavLink>
                  <NavLink
                    onClick={this.toggleMobileMenu}
                    className="nav__item"
                    to="#"
                  >
                    <img className="nav__line" src={line} alt="" /> Partner
                  </NavLink>
                </div>
              </div>
            </header>
          </div>
        ) : (
          <header>
            <div className="App-header ph2 pv3 cf">
              <Link to="/">
                <h2 className="App-title fl ma0 black f3">SmartShirt</h2>
              </Link>
              <img
                onClick={this.toggleMobileMenu}
                src={menu}
                alt="Menu"
                className="fr mt2 pointer"
              />

              <span className="pl3" style={{ verticalAlign: 'sub' }}>
                {this.props.msg}
              </span>
            </div>
          </header>
        )}
      </div>
    )
  }
}
