import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log("Rendering <Message/>");
    if(this.props.username) {
      return (
        <div className="message">
          <span className="message-username">{this.props.username}</span>
          <span className="message-content">{this.props.message}</span>
        </div>
      );
    } else {
      return (
        <div className="message system">
          {this.props.message}
        </div>
      );
    }
  }
}
export default Message;
