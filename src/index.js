const express = require('express')
const http = require('http')
const socketio = require('socket.io')

const { PORT } = require('./config/server-config')

const app = express();
const server = http.createServer(app);
const io = socketio(server)

io.on('connection', (socket) => {
    console.log('User has connected', socket.id);

    setInterval(() => {
        socket.emit('from_server')
    }, 2000)

    socket.on('from_client', () => {
        console.log('New event from client')
    })

  });

app.use('/', express.static(__dirname + '/public'))

server.listen(PORT, async () => {
    console.log(`Server started at port ${PORT}`)
})