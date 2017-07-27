import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.socket;
    this.state = {
      currentUser: {name: 'Bob'},
      messages: []
    };
    this.addMessage = this.addMessage.bind(this);
    this.addUser = this.addUser.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001/');
    console.log('Connected to server');
    console.log('componentDidMount <App />');

    this.socket.onmessage = (event) => {
      // console.log(event);
      const newMessage = JSON.parse(event.data);
      const messages = this.state.messages.concat(newMessage);
      this.setState({messages: messages});
    };
  }

  addMessage(content) {
    const newMessage = {
      username: this.state.currentUser.name, 
      content: content
    };
    this.socket.send(JSON.stringify(newMessage));
  }

  addUser(user) {
    const updateUser = {
      name: user
    }
    this.setState({currentUser: updateUser});
    this.socket.send(JSON.stringify(updateUser));
  }

  render() {
    console.log('Rendering <App/>');
    return (
      <div>
        <ChatBar addMessage={this.addMessage} addUser={this.addUser} currentUser={this.state.currentUser} />
        <MessageList messages={this.state.messages} />
      </div>
    );
  }
}
export default App;