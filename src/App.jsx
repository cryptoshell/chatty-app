import React, {Component} from 'react';

// import .jsx files that are used in App.jsx
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

// Class App receives response from server
// and passes it down to ChatBar, MessageList (and Message) components
// via props
class App extends Component {
  constructor(props) {
    super(props);
    this.socket;
    // Set initial state, incl. user, message, number of users
    this.state = {
      currentUser: {name: 'Anonymous'},
      messages: [],
      userCount: 0
    };

    // Bind this-context to functions defined below
    this.addMessage = this.addMessage.bind(this);
    this.addUser = this.addUser.bind(this);
  }

  // After mounting
  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001/');
    
    this.socket.onmessage = (event) => {
      // If incoming data is a number then update userCount
      if (typeof JSON.parse(event.data) == 'number'){ 
          const userCount = JSON.parse(event.data);
          this.setState({userCount: userCount})
      } else { // Else incoming data is a string or message
      const data = JSON.parse(event.data);
        // Depending on the message type
        switch(data.type) {
          case 'incomingMessage':
            const messages = this.state.messages.concat(data);
            this.setState({messages: messages});
            break;
          case 'incomingNotification':
            const notifications = this.state.messages.concat(data);
            this.setState({messages: notifications});
            break;
          default:
            throw new Error('Unknown event type', data.type);
        }
      }
    };
  }

  // Function to create new message with data returned from server
  addMessage(content) {
    const newMessage = {
      username: this.state.currentUser.name, 
      type: 'postMessage',
      content: content
    };
    this.socket.send(JSON.stringify(newMessage));
  }

  // Function to add user with user-data returned from server
  addUser(user) {
    const updateUser = {
      name: user,
      type: 'postNotification',
      content: `${this.state.currentUser.name} has changed their name to ${user}.`
    }
    this.setState({currentUser: updateUser});
    this.socket.send(JSON.stringify(updateUser));
  }

  // Render page and pass in data via props
  render() {
    return (
      <div>
        <NavBar userCount={this.state.userCount} />
        <ChatBar addMessage={this.addMessage} addUser={this.addUser} currentUser={this.state.currentUser} />
        <MessageList messages={this.state.messages} />
      </div>
    );
  }
}
export default App;