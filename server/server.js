const express = require('express');
const SocketServer = require('ws');
const port = process.env.port || 3001;
const app = express();

const server = app.listen(port, () =>
  console.log(`Server running on port ${port}`),
);

// Creating a socket server instance
const wss = new SocketServer.Server({ server });
