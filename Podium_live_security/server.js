const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { PassThrough } = require('stream');
const socketIORooms = require('socket.io-rooms');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 3000;

// Attach the socket.io-rooms plugin
io.use(socketIORooms());

io.on('connection', (socket) => {
  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
  });

  socket.on('offer', (offer, roomId) => {
    socket.to(roomId).emit('offer', offer);
  });

  socket.on('answer', (answer, roomId) => {
    socket.to(roomId).emit('answer', answer);
  });

  socket.on('iceCandidate', (candidate, roomId) => {
    socket.to(roomId).emit('iceCandidate', candidate);
  });

  const audioStream = new PassThrough();
  socket.on('audio', (audioChunk, roomId) => {
    audioStream.write(audioChunk);
    socket.to(roomId).emit('audio', audioChunk);
  });

  socket.on('disconnect', () => {
    audioStream.end();
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
