import React, {Component} from 'react';

import Message from './Message.jsx';

class MessageList extends Component {
  constructor() {
    super();
  }
  render() {
    console.log("Rendering <MessageList/>");
    const messages = this.props.messages.map(message => {
      return <Message 
      key={message.id}
      user={message.username} 
      message={message.content} />
    });

    return (
      <main className="messages">
        {messages}
      </main>
    )
  }
}
export default MessageList;
