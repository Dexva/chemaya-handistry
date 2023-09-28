const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: { origin: "http://localhost:3000" }
});

app.get('/', (req, res) => {
    res.sendFile('/Users/davisnicholomagpantay/Documents/Grade 12 Files/Research 3/Revamped Handistry/handistry/hgnui-test/home.html');
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        socket.broadcast.emit("message", msg);
    });
});

server.listen(5500, () => {
  console.log('listening on *:5500');
});

//-----------------------------------------