const express = require('express');
const SocketServer = require('ws');
const port = process.env.port || 3001;
const app = express();

const server = app.listen(port, () =>
  console.log(`Server running on port ${port}`),
);

// Creating a socket server instance
const wss = new SocketServer.Server({ server });

wss.broadcast = data => {
  wss.clients.forEach(client => {
    if (client.readyState === SocketServer.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', wsClient => {
  // whenever a client connects
  console.log('Client is connected');

  // Whenever a message is received from a client
  wsClient.on('message', msg => {
    // create an object out of JSON
    const message = JSON.parse(msg);
    console.log(message);
    wss.broadcast(JSON.stringify(message));
  });

  wsClient.on('close', () => console.log('Client is disconnected'));
});
