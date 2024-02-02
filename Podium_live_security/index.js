const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express(); // Create an Express application instance

// Middlewares
app.use(express.json());
app.use(cors());

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Attach Socket.io to the server
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

// Socket.io connection event
io.on("connection", (socket) => {
  console.log("Connected");
});

const port = process.env.PORT || 3000; // Use port 3000 if PORT environment variable is not set

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;
