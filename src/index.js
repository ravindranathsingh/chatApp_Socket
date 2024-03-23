const express = require('express')
const http = require('http')
const socketio = require('socket.io')

const { PORT } = require('./config/server-config')

const app = express();
const server = http.createServer(app);
const io = socketio(server)

io.on('connection', (socket) => {
    console.log('User has connected', socket.id);

    socket.on('text_send', (data) => {
        console.log(data)
        socket.broadcast.emit('text_receive', data)
    })
  });

app.use('/', express.static(__dirname + '/public'))

server.listen(PORT, async () => {
    console.log(`Server started at port ${PORT}`)
})