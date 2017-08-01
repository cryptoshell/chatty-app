import React, {Component} from 'react';

// Class NavBar renders nav-bar section of page incl. logo
class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span className="userCount"><marquee>{this.props.userCount} 👤 online</marquee></span>
      </nav> 
    );
  }
}
export default NavBar;