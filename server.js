const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve arquivos estáticos do diretório raiz
app.use(express.static(__dirname));

// Configuração do WebSocket
wss.on('connection', ws => {
  ws.on('message', message => {
    console.log(`Received message => ${message}`);
    // Envia a mensagem recebida para todos os clientes conectados
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
