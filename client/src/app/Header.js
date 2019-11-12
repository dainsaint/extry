import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Header extends Component {
  render() {
    return (
      <nav className="header">
        <div class="header-brand">
          <Link to="/" className="nav-item no-hover"><i className="fas fa-newspaper"></i> Extry</Link>
        </div>
      </nav>
    );
  }
}

export default Header;
