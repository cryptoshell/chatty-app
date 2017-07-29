import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
  
    this.onMessage = this.onMessage.bind(this);
    this.onUser = this.onUser.bind(this);
  }

  onMessage(event) {
    this.props.addMessage(event.target.value);
    event.target.value = '';
  }

  onUser(event) {
    if (!event.target.value) {
      event.target.value = 'Anonymous';
    } else {
    this.props.addUser(event.target.value);
    }
  }

  EnterMessage = (event) => {
    if (event.key === 'Enter') {
      this.onMessage(event);
    }
  }

  UserHandler = (event) => {
     if (event.key === 'Enter') {
      this.onUser(event);
    }
  }

  render() {
    console.log("Rendering <ChatBar/>");
    return (
      <footer className="chatbar">
        <input onKeyPress={this.UserHandler} className="chatbar-username" placeholder={this.props.currentUser.name} />
        <input onKeyPress={this.EnterMessage} className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
export default ChatBar;
