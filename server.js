const express = require('express');
const request = require('request-promise-native');
const { WebhookClient } = require('discord.js');
const WebSocket = require('ws');
const http = require('http');

const app = express();
const PORT = process.env.PORT || 80;


const webhookId = '12345678'; //設定webhook ID
const webhookToken = 'abcdefghijk'; //設定webhook token


const webhookClient = new WebhookClient({ id: webhookId, token: webhookToken });

app.use(express.static('public'));

app.get('/api/ping', (req, res) => {
  const startTime = Date.now();
  res.send('pong');
  const latency = Date.now() - startTime;
});

const os = require('os');

app.get('/api/info', async (req, res) => {
  const clientIp1 = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const serverIp1 = req.socket.localAddress;
  const serverHostname = os.hostname(); // get server hostname
  const requestId = Date.now();
  const clientIp = clientIp1.replace(/^::ffff:/, '');
  const serverIp = serverIp1.replace(/^::ffff:/, '');
  res.json({
    clientIp,
    serverIp,
    serverHostname, // add server hostname to response object
    requestId,
  });

  webhookClient.send(`Client IP: ${clientIp}\nServer IP: ${serverIp}\nServer Hostname: ${serverHostname}\nRequest ID: ${requestId}`);
});


const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws, req) => {
  const clientIp = req.socket.remoteAddress.replace(/^.*:/, '');
  const serverIp = req.socket.localAddress.replace(/^.*:/, '');
  console.log(`New WebSocket connection from client ${clientIp}`);
  
  ws.on('message', (message) => {
    const receivedTime = new Date().getTime();
    const sentTime = parseInt(message, 10);
    const rtt = receivedTime - sentTime;

    ws.send(rtt.toString());
  });

  ws.on('close', () => {
    console.log(`WebSocket connection from client ${clientIp} closed`);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
