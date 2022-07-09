const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

const canvasFile = path.join(__dirname, 'canvas.json');

function readCanvas() {
  if (!fs.existsSync(canvasFile)) {
    const canvas = [];
    for (let i = 0; i < 28; i += 1) {
      const row = [];
      canvas.push(row);
      for (let j = 0; j < 18; j += 1) {
        row.push('white');
      }
    }
    return canvas;
  }

  return JSON.parse(fs.readFileSync(canvasFile));
}

function writeCanvas(canvas) {
  fs.writeFileSync(canvasFile, JSON.stringify(canvas));
}

const canvas = readCanvas();

module.exports = function createSocketServer(app, server) {
  const socketServer = new WebSocket.Server({ server });

  app.locals.canvas = canvas;

  socketServer.on('connection', (socket) => {
    socket.on('message', (message) => {
      const { row, col, color } = JSON.parse(message);
      canvas[row][col] = color;
      writeCanvas(canvas);
      socketServer.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN && client !== socket) {
          client.send(JSON.stringify({ row, col, color }));
        }
      });
    });
  });
};
