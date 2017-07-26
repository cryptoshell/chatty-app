import React, {Component} from 'react';

class ChatBar extends Component {
  constructor() {
    super();
  
    this.onMessage = this.onMessage.bind(this);
  }

  onMessage(event) {
    this.props.onNewMessage(event.target.value);
    event.target.value = '';
  }

  PressEnter = (event) => {
    if (event.key === 'Enter') {
      return this.onMessage(event);
    }
  }

  render() {
    console.log("Rendering <ChatBar/>");
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={this.props.currentUser.name} />
        <input onKeyPress={this.PressEnter} className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
export default ChatBar;
