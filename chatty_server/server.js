const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuid = require('node-uuid');

// WebSocket server parallel with webpack dev server (port 3000)
const PORT = 3001;

// New express server
const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// New WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

randomColorGenerator = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// When a client connects, assigned a socket (ws) in callback
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Broadcast the number of users
  wss.broadcast(JSON.stringify(wss.clients.size));

  // A random color is generated for each user
  const assignedColor = randomColorGenerator();

  ws.on('message', (message) => {
    const jsonMessage = JSON.parse(message);
    jsonMessage.id = uuid(); // Each message has a unique id
    jsonMessage.color = {color: assignedColor}; // All messages of one user have same color
    if(jsonMessage.type === 'postNotification') {
      jsonMessage.type = 'incomingNotification';
    } else {
      jsonMessage.type = 'incomingMessage';
    }
    // console.log('User', jsonMessage.username, 'said', jsonMessage.content);
    wss.broadcast(JSON.stringify(jsonMessage));
  });

  // Client closed their browser or other closing
  ws.on('close', () => {
    console.log('Client disconnected');
    wss.broadcast(JSON.stringify(wss.clients.size));
  });
});