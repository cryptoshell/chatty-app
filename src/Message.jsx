import React, {Component} from 'react';

// Class Message renders each new message
class Message extends Component {
  render() {
    if(this.props.username) { // if message has username (aka is of type message)
      return (
        <div className="message">
          <span className="message-username" style={this.props.color}>{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
      );
    } else { // if message is of type notification
      return (
        <div className="message system">
          {this.props.content}
        </div>
      );
    }
  }
}
export default Message;
