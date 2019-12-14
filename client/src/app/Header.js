import React, { Component } from 'react';

class Header extends Component {



  render() {
    const active = this.props.module ? <a href="#" className="active section">{ this.props.module.title }</a> : null;

    return (
      <header className="ui header">
        <h1 className="ui header">
            Extry Builder
        </h1>

        <nav className="ui breadcrumb">
          <a className="section" onClick={ this.props.onHomeSelect } href="#">Home</a>
          <div className="divider">></div>
          { active }
        </nav>

      </header>
    );
  }
}

export default Header;
