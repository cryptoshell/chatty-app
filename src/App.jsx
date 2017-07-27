import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.socket;
    this.state = {
      currentUser: {name: 'Anonymous'},
      messages: [],
      userCount: 0
    };
    this.addMessage = this.addMessage.bind(this);
    this.addUser = this.addUser.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount <App />');
    this.socket = new WebSocket('ws://localhost:3001/');
    
    this.socket.onopen = (event) => {
      console.log('Connected to server');
    };
    
    this.socket.onmessage = (event) => {
      // If incoming data is a number then update userCount
      if(typeof JSON.parse(event.data) == 'number'){
        const userCount = JSON.parse(event.data);
        this.setState({userCount: userCount})
      } else { // Else incoming data is a string
      const data = JSON.parse(event.data);
        switch(data.type) {
          case 'incomingMessage':
            let messages = this.state.messages.concat(data);
            this.setState({messages: messages});
            break;
          case 'incomingNotification':
            let notifications = this.state.messages.concat(data);
            this.setState({messages: notifications});
            break;
          default:
            throw new Error('Unknown event type', data.type);
        }
      }
    };
  }

  addMessage(content) {
    const newMessage = {
      username: this.state.currentUser.name, 
      type: 'postMessage',
      content: content
    };
    this.socket.send(JSON.stringify(newMessage));
  }

  addUser(user) {
    const updateUser = {
      name: user,
      type: 'postNotification',
      content: `${this.state.currentUser.name} has changed their name to ${user}.`
    }
    this.setState({currentUser: updateUser});
    this.socket.send(JSON.stringify(updateUser));
  }

  render() {
    console.log('Rendering <App/>');
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="userCount">{this.state.userCount} users online</span>  
        </nav>
        <ChatBar addMessage={this.addMessage} addUser={this.addUser} currentUser={this.state.currentUser} />
        <MessageList messages={this.state.messages} />
      </div>
    );
  }
}
export default App;