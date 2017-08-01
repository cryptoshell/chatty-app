import React, {Component} from 'react';

// Class ChatBar incl. event-handling when user inputs
// user-data or new message content
class ChatBar extends Component {
  constructor(props) {
    super(props);
  
    // Binds this-context to functions defined below
    this.onMessage = this.onMessage.bind(this);
    this.onUser = this.onUser.bind(this);
  }

  // Function passes user-input value to addMessage function
  onMessage(event) {
    this.props.addMessage(event.target.value);
    event.target.value = ''; // Reset the input field to blank
  }

  // Function passes user-input value to addUser function
  // If user enters empty string, default is set to 'Anonymous'
  onUser(event) {
    if (!event.target.value) {
      event.target.value = 'Anonymous';
    } else {
    this.props.addUser(event.target.value);
    }
  }

  // Event-handler function on Enter-press
  // Event data is passed to onMessage function defined above
  EnterMessage = (event) => {
    if (event.key === 'Enter') {
      this.onMessage(event);
    }
  }

  // Event-handler function on Enter-press
  // Event data is passed to onUser function defined above
  UserHandler = (event) => {
     if (event.key === 'Enter') {
      this.onUser(event);
    }
  }

  // Render footer/chat-bar of page
  render() {
    return (
      <footer className="chatbar">
        <input onKeyPress={this.UserHandler} className="chatbar-username" placeholder={this.props.currentUser.name} />
        <input onKeyPress={this.EnterMessage} className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
export default ChatBar;
