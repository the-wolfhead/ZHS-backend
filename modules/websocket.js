const WebSocket = require('ws');

const initializeWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', function connection(ws) {
    console.log('A new client connected');

    ws.on('message', function incoming(message) {
      console.log('Received message:', message);

      try {
        const data = JSON.parse(message); // Assuming messages are JSON formatted
        handleIncomingMessage(ws, data); // Delegate message handling to a separate function
      } catch (error) {
        console.error('Error parsing incoming message:', error);
      }
    });

    ws.send('Welcome to the WebSocket server!');
  });

  return wss;
};

const handleIncomingMessage = (ws, data) => {
  // Handle different types of messages
  switch (data.type) {
    case 'iceCandidate':
      handleIceCandidate(ws, data.candidate);
      break;
    case 'sessionDescription':
      handleSessionDescription(ws, data.description);
      break;
    // Add more cases for different message types as needed
    default:
      console.warn('Unknown message type:', data.type);
  }
};

const handleIceCandidate = (ws, candidate) => {
  console.log('Received ICE candidate:', candidate);
  // Handle ICE candidate, for example, forward it to the other peer
};

const handleSessionDescription = (ws, description) => {
  console.log('Received session description:', description);
  // Handle session description, for example, forward it to the other peer
};

module.exports = initializeWebSocket;
