import React, {Component} from 'react';

import Message from './Message.jsx';

// Class MessageList renders message block
class MessageList extends Component {
  constructor() {
    super();
  }
  render() {
    // Maps through messages array and passes props object argument with data
    // returning the React element 'Message'
    const messages = this.props.messages.map(message => {
      return <Message 
      key={message.id}
      username={message.username} 
      content={message.content}
      color={message.color} />
    });
    return (
      <main className="messages">
        {messages}           
      </main>
    )
  }
}
export default MessageList;
