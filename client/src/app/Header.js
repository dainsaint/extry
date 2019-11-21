import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Header extends Component {
  render() {
    return (
      <nav className="uk-navbar-container" uk-navbar="true">
        <div className="uk-navbar-left">
          <Link to="/" className="uk-logo"><i className="fas fa-newspaper"></i> Extry</Link>
        </div>
      </nav>
    );
  }
}

export default Header;
